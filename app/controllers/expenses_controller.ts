import type { HttpContext } from '@adonisjs/core/http'
import Expense from '#models/expense'

export default class ExpensesController {
  // Menampilkan semua pengeluaran
  public async index({ view }: HttpContext) {
    const expenses = await Expense.query().orderBy('expense_date', 'desc')
    
    // Hitung total pengeluaran
    const totalExpenses = expenses.reduce((sum, expense) => {
      return sum + Number(expense.amount)
    }, 0)
    
    // Hitung pengeluaran per kategori
    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + Number(expense.amount)
      return acc
    }, {} as Record<string, number>)

    return view.render('expenses/index', { 
      expenses, 
      totalExpenses,
      categoryTotals 
    })
  }

  // Menampilkan form tambah pengeluaran
  public async create({ view }: HttpContext) {
    return view.render('expenses/create')
  }

  // Menyimpan pengeluaran baru
  public async store({ request, response, session }: HttpContext) {
    const { title, description, amount, category, expense_date } = request.only([
      'title', 'description', 'amount', 'category', 'expense_date'
    ])

    // Validasi sederhana
    if (!title || !amount || !expense_date) {
      session.flash('error', 'Judul, jumlah, dan tanggal harus diisi!')
      return response.redirect().back()
    }

    if (Number(amount) <= 0) {
      session.flash('error', 'Jumlah pengeluaran harus lebih dari 0!')
      return response.redirect().back()
    }

    try {
      // Simpan ke database
      const expense = await Expense.create({
        title,
        description,
        amount: Number(amount),
        category: category || 'Lainnya',
        expenseDate: expense_date
      })

      session.flash('success', `Pengeluaran "${title}" sebesar Rp ${Number(amount).toLocaleString('id-ID')} berhasil ditambahkan!`)
      return response.redirect('/expenses')
    } catch (error) {
      session.flash('error', 'Terjadi kesalahan saat menyimpan data!')
      return response.redirect().back()
    }
  }

  // Menampilkan detail pengeluaran
  public async show({ params, view, response }: HttpContext) {
    const expense = await Expense.find(params.id)

    if (!expense) {
      return response.status(404).send('Pengeluaran tidak ditemukan')
    }

    return view.render('expenses/show', { expense })
  }
}