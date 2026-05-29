// on importe tous les modules dont on a besoin ainsi que les différentes fonction qui interrogent la base de donnée
import express from "express"
import sqlite3 from "sqlite3"

import {
  getAllTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo
} from './lib/todos_model.js'

// la variable app contiendra toutes les infos et les fonction d'express
const app = express()

// config express
// on utilise le moteur de template ejs (en gros permet d'ecrire et executer du js directement dans le html)
app.set('view engine', 'ejs')

// cette ligne pour que express arrive a lire correctement les infos evoyées depuis un formulaire
app.use(express.urlencoded({ extended: true }))
// cette ligne pour dire a express que les fichiers statics (style.css, images etc sont rangés dans un dossier  "public")
app.use(express.static('public'))

// connexion a la base de donnée sqlite
const db = new sqlite3.Database('./db.sqlite')

// ======================
// ROUTES
// ======================

// afficher la liste des todos
app.get('/', (req, res) => {

  // on recupere la liste des todo dans la base de donnée
  getAllTodos(db, (todos) => {
    // on affiche le template "index" en lui donnant lle tableau des todos
    res.render('index', { todos })

  })

})

// afficher formulaire ajout
app.get('/add', (req, res) => {

  res.render('ajouter')

})

// traitement du formulaire d'ajout
app.post('/add', (req, res) => {

    // req.body contient un objet de la forme : 
    /* {
        nom: "nom de la tache",
        deadline : "2026-06-01",
        priorite : 1
    }*/
    // ce qui correspond aux champs de notre table 
    createTodo(db, req.body)

  res.redirect('/')

})

// afficher formulaire édition prérempli
app.get('/edit/:id', (req, res) => {
    // on va chercher les infos de LA todo que l'on souhaite modifier dans la base grace a son id unique
  getTodoById(db, req.params.id, (todo) => {
    // une fois qu'on l'a , on donne les infos a la vue "modifier"
    console.log(todo)
    res.render('modifier', { todo })

  })

})

// traitement du formulaire de modification (update)
app.post('/update/:id', (req, res) => {

    // on met a jour les infos dans la base de données
  updateTodo(db, req.params.id, req.body)
    // on redirige l'utilisateur vers la liste des todos
  res.redirect('/')

})

// suppression
app.get('/delete/:id', (req, res) => {
 // on supprime la todo dans la base de donnée en la ciblant par son id
  deleteTodo(db, req.params.id)
// puis on redirige vers la liste des todos (index)
  res.redirect('/')

})

// serveur : express lance un serveur local sur le port 3000
app.listen(3000, () => {

  console.log('Serveur lancé : http://localhost:3000')

})