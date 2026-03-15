import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import request from 'supertest';
import { BikeModule } from '../src/modules/bike/bike.module';
import { BikeCategoryEntity } from '../src/modules/bike/infrastructure/entities/BikeCategory.entity';
import { AccessoryModule } from '../src/modules/accessory/accessory.module';
import { ReservationModule } from '../src/modules/reservation/reservation.module';
import { UserModule } from '../src/modules/user/user.module';
import { RepairModule } from '../src/modules/repair/repair.module';
import { RentalPackModule } from '../src/modules/rental-pack/rental-pack.module';
import { ReviewModule } from '../src/modules/review/review.module';

describe('AtlanticBike API (e2e)', () => {
  let app: Awaited<ReturnType<TestingModule['createNestApplication']>>;
  let httpServer: any;
  let dataSource: DataSource;

  beforeAll(async () => {
    jest.setTimeout(30000);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [],
          synchronize: true,
          autoLoadEntities: true,
        }),
        UserModule,
        BikeModule,
        AccessoryModule,
        ReservationModule,
        RepairModule,
        RentalPackModule,
        ReviewModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );
    await app.init();

    httpServer = app.getHttpServer();
    dataSource = app.get(DataSource);
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it('performs core business flows across modules', async () => {
    // Seed required references
    const category = await dataSource
      .getRepository(BikeCategoryEntity)
      .save({ name: 'Road Bikes', description: 'Lightweight bikes' });

    // Create a user
    const createUserResponse = await request(httpServer)
      .post('/api/users')
      .send({
        email: 'alice@example.com',
        passwordHash: 'hashed-password',
        firstName: 'Alice',
        lastName: 'Doe',
        phone: '5551234567',
        role: 'client',
        addresses: [
          {
            address: '123 Main St',
            city: 'Springfield',
            postalCode: '12345',
            country: 'USA',
            isDefault: true,
          },
        ],
      })
      .expect(201);

    const user = createUserResponse.body;
    expect(user.id).toBeDefined();

    const usersList = await request(httpServer).get('/api/users').expect(200);
    expect(usersList.body).toHaveLength(1);

    const userId = user.id as number;

    // Create an accessory
    const accessoryResponse = await request(httpServer)
      .post('/api/accessories')
      .send({
        name: 'Helmet',
        description: 'Safety first',
        stockQuantity: 10,
        price: 49.99,
      })
      .expect(201);
    const accessoryId = accessoryResponse.body.id as number;

    // Create a bike
    const bikeResponse = await request(httpServer)
      .post('/api/bikes')
      .send({
        categoryId: category.id,
        frameNumber: 'FRAME-001',
        status: 'available',
        purchaseDate: '2025-01-01',
        rentalPricePerDay: 25,
      })
      .expect(201);

    const bikeId = bikeResponse.body.id as number;

    const bikesList = await request(httpServer).get('/api/bikes').expect(200);
    expect(bikesList.body.length).toBeGreaterThanOrEqual(1);

    // Create a reservation
    const reservationResponse = await request(httpServer)
      .post('/api/reservations')
      .send({
        userId,
        bikeId,
        startDate: '2025-02-10',
        endDate: '2025-02-12',
        totalPrice: 50,
        status: 'confirmed',
      })
      .expect(201);

    expect(reservationResponse.body.status).toBe('confirmed');

    const reservationsList = await request(httpServer)
      .get(`/api/reservations/user/${userId}`)
      .expect(200);
    expect(reservationsList.body).toHaveLength(1);

    // Create a repair
    const repairResponse = await request(httpServer)
      .post('/api/repairs')
      .send({
        bikeId,
        mechanicId: userId,
        description: 'Brake adjustment',
        repairDate: '2025-02-15',
        cost: 30,
        status: 'pending',
      })
      .expect(201);

    expect(repairResponse.body.status).toBe('pending');

    const repairsList = await request(httpServer).get('/api/repairs').expect(200);
    expect(repairsList.body.length).toBeGreaterThanOrEqual(1);

    // Create a rental pack and add an accessory item
    const packResponse = await request(httpServer)
      .post('/api/rental-packs')
      .send({
        name: 'Weekend Pack',
        description: 'Bike + helmet bundle',
        price: 99,
      })
      .expect(201);

    const packId = packResponse.body.id as number;

    await request(httpServer)
      .post(`/api/rental-packs/${packId}/items`)
      .send({
        accessoryId,
        quantity: 1,
      })
      .expect(201);

    const packsList = await request(httpServer)
      .get('/api/rental-packs')
      .expect(200);
    expect(packsList.body[0].items.length).toBeGreaterThanOrEqual(1);

    // Leave a review
    const reviewResponse = await request(httpServer)
      .post('/api/reviews')
      .send({
        userId,
        bikeId,
        rating: 5,
        comment: 'Loved the ride!',
        status: 'approved',
      })
      .expect(201);

    expect(reviewResponse.body.status).toBe('approved');

    const reviewsByBike = await request(httpServer)
      .get(`/api/reviews/bike/${bikeId}`)
      .expect(200);
    expect(reviewsByBike.body).toHaveLength(1);
  });
});
