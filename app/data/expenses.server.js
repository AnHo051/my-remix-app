import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addExpense(expenseData, userId) {
  try {
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        note: expenseData.note,
        date: new Date(expenseData.date),
        User: {
          connect: {
            id: userId,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getExpenses(userId) {
  try {
    const expenses = await prisma.expense.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });
    return expenses;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getExpense(id) {
  try {
    const expense = await prisma.expense.findFirst({
      where: { id },
    });
    return expense;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateExpense(id, expenseData) {
  try {
    return await prisma.expense.update({
      where: { id },
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        note: expenseData.note,
        date: new Date(expenseData.date),
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteExpense(id) {
  try {
    return await prisma.expense.delete({
      where: { id },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getYearExpense(year, userId) {
  if (!userId || !year) return null;
  const startOfYear = new Date(year, 0, 1); // January 1st of the given year
  const endOfYear = new Date(year, 11, 31); // December 31st of the given year

  // Fetch expenses within the year range
  const expenses = await prisma.expense.findMany({
    where: {
      userId: userId,
      date: {
        gte: startOfYear,
        lte: endOfYear,
      },
    },
  });

  // Group expenses by month
  const groupedByMonth = expenses.reduce((acc, expense) => {
    const month = expense.date.getMonth(); // Get month of the expense (0-11)
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(expense);
    return acc;
  }, {});

  const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const result = Object.keys(groupedByMonth).map((month) => {
    const amout = Math.round(
      groupedByMonth[month].reduce((sum, { amount }) => sum + amount, 0)
    );
    return {
      month: MONTHS[month], // Convert month back to string format
      totalExpense: amout,
    };
  });

  return result;
}
