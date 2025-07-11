-- CreateTable
CREATE TABLE "OrderRequest" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "services" JSONB NOT NULL,
    "plans" JSONB NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderRequest" ADD CONSTRAINT "OrderRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
