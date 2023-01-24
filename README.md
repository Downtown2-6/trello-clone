# trello-clone

createdb trello_db


user: {
  email: string
  firstName: string
  lastName: string
  password: string

}

Boards: {
  list of board: [ boardName, ID ]
}

board: {
  //axios call to grab this board
  lists: [{
      tasks: [{
        name: string

      }]
    }]
  }
}
