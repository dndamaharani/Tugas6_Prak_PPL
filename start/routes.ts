/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const ExpensesController = () => import('#controllers/expenses_controller')

// router.on('/').render('pages/home')
router.get('/hai', [ExpensesController, 'index'])

// Routes untuk expenses
router.get('/expenses', [ExpensesController, 'index']).as('expenses.index')
router.get('/expenses/create', [ExpensesController, 'create']).as('expenses.create')
router.post('/expenses', [ExpensesController, 'store']).as('expenses.store')
router.get('/expenses/:id', [ExpensesController, 'show']).as('expenses.show')