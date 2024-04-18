'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Select, MenuItem, Box, InputLabel, FormControl, Modal, Typography, Button } from '@mui/material';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

function UploadForm({openModal, func}) {

    const [file, setFile] = useState(null);
    const [campaign, setCampaign] = useState(null);
    const [selectedCampaign, setSelectedCampaign] = useState('');
    const [success, setSuccess] = useState();
    const [color, setColor] = useState('');
    


    function submitForm(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        formData.append('campaign_id', selectedCampaign)

        axios.post('http://127.0.0.1:8000/api/upload', formData)
            .then((res)=>{
                setSuccess(true);
                setColor('green')
                setTimeout(() => window.location.reload(), 2000);
            }).catch((err)=>{
                setSuccess(false);
                setColor('red');
            });
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/campaigns').then(({data}) => {
            setCampaign(data);
        });
    }, []);

    return (
        <Modal
            open={openModal}
            sx={{ display: 'flex', alignItems: 'center', justifyContent:'center' }}
        >
            <Box width={400} bgcolor={'white'} p={6} borderRadius={4}>
                <Box width={40} height={40} position={'relative'} left={'100%'} sx={{ ':hover': {cursor: 'pointer'} }} onClick={func}> 
                    <DisabledByDefaultIcon sx={{ color: '#C3C2C4', borderRadius: '5px' }}/>
                </Box>
                <form onSubmit={submitForm} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <input type="file" onChange={e => setFile(e.target.files[0])} />
                        <FormControl fullWidth sx={{ marginY: 6 }}>
                            <InputLabel id="demo-simple-select-label">Campanhas</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Campanhas"
                                value={selectedCampaign}
                                onChange={(e) => setSelectedCampaign(e.target.value)}
                                required
                            >
                                {campaign && campaign.map((item, index) => {
                                    return(
                                        <MenuItem key={index + item.name} value={item.id}>{item.name}</MenuItem>
                                    )
                                })}
                            </Select>
                            <Typography textAlign={'center'} mt={2} color={success ? 'green' : 'red'} display={success != null ? 'block' : 'none'}>
                                {success ? 'Base enviada com sucesso! recarregando a pagina' : 'Erro ao enviar os dados'}
                            </Typography>
                        </FormControl>
                    <button type="submit">Enviar</button>
                </form>
            </Box>
        </Modal>
    );
}

export default UploadForm;
