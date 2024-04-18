'use client'
import { Box, Modal, Typography, Button } from "@mui/material";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import axios from "axios";
import { useState } from "react";

export default function DeleteCliente({ modal, func, clientId }) {

    const [success, setSuccess] = useState('');
    const [sended, setSended] = useState(false);
    
    const deleteClient = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/clients/${id}`).then((res) => {
            setSuccess(true);
            setSended(true)
            setTimeout(() => window.location.reload(), 2000);
        }).catch((err) => {
            setSuccess(false);
            setSended(true)
        })
    }
    
    return(
        <Modal
            open={modal}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Box width={300} p={4} bgcolor={'white'} textAlign={'center'} borderRadius={'5px'}>
                <Box width={40} height={40} position={'relative'} left={'90%'} sx={{ ':hover': {cursor: 'pointer'} }} onClick={func}> 
                    <DisabledByDefaultIcon sx={{ color: '#C3C2C4', borderRadius: '5px' }}/>
                </Box>
                <Typography>Tem certeza que deseja excluir este cliente?</Typography>
                <Typography color={success ? 'black' : 'red'} my={2} display={sended ? 'block' : 'none'}>
                    {success ? 'Cliente deletado com sucesso, recarregando a pagina' : "Erro ao deletar o cliente"}
                </Typography>
                <Box mt={2}>
                    <button onClick={() => deleteClient(clientId)} style={{ marginRight: 10, backgroundColor: 'red', color: 'white' }}>
                        Sim
                    </button>
                    <button>
                        Não
                    </button>
                </Box>
            </Box>
        </Modal>
    )
}