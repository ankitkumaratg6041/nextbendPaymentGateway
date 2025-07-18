-- CreateTable
CREATE TABLE "ClientRequest" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "basicInfo" JSONB NOT NULL,
    "selectedHelp" JSONB NOT NULL,
    "answers" JSONB NOT NULL,
    "uploadedFiles" TEXT[],
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClientRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClientRequest" ADD CONSTRAINT "ClientRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
