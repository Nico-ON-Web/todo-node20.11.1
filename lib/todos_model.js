

/**
 * Récupère toutes les tâches présentes dans la base de données.
 *
 * @param {object} db - Instance de la base SQLite.
 * @param {function} callback - Fonction appelée avec la liste des todos.
 *
 * @returns {void}
 */
export function getAllTodos(db, callback) {

  const sql = `SELECT * FROM todos ORDER BY id DESC`

  db.all(sql, [], (err, rows) => {

    if (err) {
      console.error(err)
      return callback([])
    }

    callback(rows)
  })
}



/**
 * Récupère une tâche spécifique grâce à son identifiant.
 *
 * @param {object} db - Instance de la base SQLite.
 * @param {number|string} id - Identifiant de la tâche.
 * @param {function} callback - Fonction appelée avec la tâche trouvée (ou null).
 *
 * @returns {void}
 */
export function getTodoById(db, id, callback) {

  const sql = `SELECT * FROM todos WHERE id = ?`

  db.get(sql, [id], (err, row) => {

    if (err) {
      console.error(err)
      return callback(null)
    }

    callback(row)
  })
}


/**
 * Ajoute une nouvelle tâche dans la base de données.
 *
 * @param {object} db - Instance de la base SQLite.
 * @param {object} todo - Données de la tâche.
 * @param {string} todo.nom - Nom de la tâche.
 * @param {string} todo.deadline - Date limite de la tâche.
 * @param {number} todo.priorite - Niveau de priorité (1, 2 ou 3).
 *
 * @returns {void}
 */

export function createTodo(db, { nom, deadline, priorite }) {

  const sql = `
    INSERT INTO todos (nom, deadline, priorite)
    VALUES (?, ?, ?)
  `

  db.run(sql, [nom, deadline, priorite], (err) => {

    if (err) {
      console.error(err)
    }

  })
}

/**
 * Met à jour une tâche existante.
 *
 * @param {object} db - Instance de la base SQLite.
 * @param {number|string} id - Identifiant de la tâche à modifier.
 * @param {object} todo - Nouvelles données de la tâche.
 * @param {string} todo.nom - Nom de la tâche.
 * @param {string} todo.deadline - Date limite.
 * @param {number} todo.priorite - Priorité (1, 2 ou 3).
 *
 * @returns {void}
 */
export function updateTodo(db, id, { nom, deadline, priorite }) {

  const sql = `
    UPDATE todos
    SET nom = ?, deadline = ?, priorite = ?
    WHERE id = ?
  `

  db.run(sql, [nom, deadline, priorite, id], (err) => {

    if (err) {
      console.error(err)
    }

  })
}

/**
 * Supprime une tâche de la base de données.
 *
 * @param {object} db - Instance de la base SQLite.
 * @param {number|string} id - Identifiant de la tâche à supprimer.
 *
 * @returns {void}
 */

export function deleteTodo(db, id) {

  const sql = `DELETE FROM todos WHERE id = ?`

  db.run(sql, [id], (err) => {

    if (err) {
      console.error(err)
    }

  })
}