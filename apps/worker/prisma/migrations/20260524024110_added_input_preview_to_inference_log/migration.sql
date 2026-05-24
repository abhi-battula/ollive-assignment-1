/*
  Warnings:

  - Added the required column `inputPreview` to the `InferenceLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InferenceLog" ADD COLUMN     "inputPreview" TEXT NOT NULL;
