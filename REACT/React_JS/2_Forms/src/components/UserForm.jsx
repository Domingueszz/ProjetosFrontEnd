import React from 'react'

const UserForm = ( {data, updateFielHandler} ) => {
  return (
    <div>
      <div className="form-control">
        <label htmlFor="name">Nome:</label>
        <input 
        type="text"
        name="text"
        id='name'
        placeholder='Digite o sue nome:'
        required
        value={data.name || ""}
        onChange={(e) => updateFielHandler("name", e.target.value)}
      />
      </div>

      <div className="form-control">
        <label htmlFor="email">E-mail:</label>
        <input 
        type="text"
        name="text"
        id='email'
        placeholder='Digite o sue e-mail:'
        required 
        value={data.email || ""}
        onChange={(e) => updateFielHandler("email", e.target.value)}
      />
      </div>
    </div>
  )
}

export default UserForm
