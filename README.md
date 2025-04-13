# mamma-moves

## Description
A web application for tracking and managing mamma moves (Please add your project description here)

## Prerequisites
- Node.js (v14 or higher recommended)
- npm or yarn
- Git
- Docker and Docker Compose (for containerized setup)

## Installation

### Backend Setup

#### Option 1: Docker Setup (Recommended)
1. Clone the repository:
```bash
git clone https://github.com/yourusername/mamma-moves.git
cd mamma-moves/backend
```

2. Create a `.env` file and configure your environment variables:
```bash
cp .env.example .env
```

3. Start the services using Docker Compose:
```bash
docker-compose up -d
```

This will start:
- PostgreSQL database on port 5432
- MinIO object storage on ports 9000 (API) and 9001 (Console)

You can access:
- MinIO Console at `http://localhost:9001`
- MinIO API at `http://localhost:9000`

Default credentials:
- PostgreSQL: 
  - User: postgres
  - Password: postgres
  - Database: mamma_moves
- MinIO:
  - User: minioadmin
  - Password: minioadmin

#### Option 2: Local Setup
1. Clone the repository:
```bash
git clone https://github.com/yourusername/mamma-moves.git
cd mamma-moves
```

2. Navigate to the backend directory:
```bash
cd backend
```

3. Install dependencies:
```bash
npm install
```

4. Create a `.env` file and configure your environment variables:
```bash
cp .env.example .env
```

5. Start the backend server:
```bash
npm run start:dev
```

The backend server should now be running on `http://localhost:YOUR_PORT`

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm run dev
```

The frontend application should now be running on `http://localhost:3000`

## Available Scripts

### Backend
- `npm run dev` - Start the development server
- `npm run build` - Build the application
- `npm run start` - Start the production server
- `npm run test` - Run tests

### Frontend
- `npm run dev` - Start the development server
- `npm run build` - Build the application
- `npm run start` - Start the production server
- `npm run test` - Run tests

## Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details