import { Router } from "express";
import userModel from "../models/user.model.js";

const router = Router()


router.get('/', async (req, res) => {
    res.redirect('/sessions/login')
})

// Registro
router.get('/register', (req, res) => {
    res.render('sessions/register', {
        pageTitle: 'Registrar usuario'
    })
})

router.post('/register', async (req, res) => {
    const userNew = req.body;
    const user = new userModel(userNew)

    await user.save()
    res.redirect('/sessions/login')
})

// Login
router.get('/login', (req, res) => {
    res.render('sessions/login', {
        pageTitle: 'Iniciar sesión',
    })
})



router.post('/login', async (req,res) => {
    const { email, password } = req.body;
    if( email === 'admin@coder.com' && password === 'admincoder123') {
        req.session.user = { username: 'admin', role: 'admin' }
        res.redirect('/products')
    } else {
        const user = await userModel.findOne({ email, password }).lean().exec()
        if (!user) {
            return res.status(401).render('errors/base', {
                error: "Error en email y/o contraseña"
            }) 
        }
        req.session.user = { username: user.first_name, role: 'usuario' }
        res.redirect('/products')
    }    
})

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) res.status(500).render('errors/base', {
            error: err
        }) 
        else {
            res.redirect('/sessions/login')
        }
    })
})

export default router;