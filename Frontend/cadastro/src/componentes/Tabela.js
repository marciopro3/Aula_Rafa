import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Tabela() {

    const [usuarios, setUsuarios] = useState([])

    useEffect(() => {

        async function run() {
            const result = await axios.get('http://localhost:3001/usuario')
            setUsuarios(result.data)
        }
        run()



    }, [])



    return (
        <table style={{ border: '1px solid' }}>
            <thead>
                <tr>
                    <td>Id</td>
                    <td>Nome</td>
                </tr>
            </thead>
            <tbody>
                {
                    usuarios.map(usuario => {
                        return (
                            <tr>
                                <td>{usuario.id}</td>
                                <td>{usuario.nome}</td>
                            </tr>
                        )
                    })
                }

            </tbody>
        </table>
    )
}  