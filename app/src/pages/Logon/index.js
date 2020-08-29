import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

export default function Logon() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()


    async function handleLogon(e) {
        e.preventDefault()

        const data = {
            email,
            password
        }

        try {
            const response = await api.post('sessions', data)

            localStorage.setItem('token', `Bearer ${response.data.token}`)
            localStorage.setItem('ong_id', response.data.ong._id)
            localStorage.setItem('ongName', response.data.ong.name)

            history.push('/profile')
        } catch (error) {
            alert('Falha no login, tente novamente')
        }
    }


    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={handleLogon}>
                    <h1>Faça seu logon</h1>
                    
                    <input
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />
                    <input 
                        placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        />

                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes"/>
        </div>
    )
}