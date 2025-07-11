-- AlterTable
ALTER TABLE "OrderRequest" ADD COLUMN     "dealAccepted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "quotePdfUrl" TEXT;
