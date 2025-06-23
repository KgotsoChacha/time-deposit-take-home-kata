-- CreateTable
CREATE TABLE "TimeDeposit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "planType" TEXT NOT NULL,
    "days" INTEGER NOT NULL,
    "balance" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "Withdrawal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timeDepositId" INTEGER NOT NULL,
    "amount" DECIMAL NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "Withdrawal_timeDepositId_fkey" FOREIGN KEY ("timeDepositId") REFERENCES "TimeDeposit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
