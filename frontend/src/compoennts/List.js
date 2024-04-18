'use client'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, FormControl, InputLabel, MenuItem, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import UploadForm from "./UploadForm";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteCliente from "./DeleteClient";

export default function List() {

    const [clients, setClients] = useState();
    const [openUploadModal, setOpenUploadModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [textColor, setTextColor] = useState();
    const [campaign, setCampaign] = useState();
    const [selectedCampaign, setSelectedCampaign] = useState('all');
    const [clientId, setClientId] = useState('');

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/clients/campaign/${selectedCampaign}`).then(({data}) => {
            setClients(data);
            if(data.length != 0) {
                setTextColor('transparent');
            } else {
                setTextColor('red');
            }
            console.log(data);
        });
    }, [selectedCampaign]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/campaigns').then(({data}) => {
            setCampaign(data);
            console.log(data);
        });
    }, [])

    function formatPhoneNumber(phoneNumber) {
        phoneNumber = phoneNumber.replace(/\D/g, '');
        phoneNumber = phoneNumber.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3-$4');
        return phoneNumber;
    }
    
    function formatDate(data) {
        const slices = data.split('-');
        const obj = new Date(slices[0], slices[1] - 1, slices[2]);
        
        const dia = obj.getDate().toString().padStart(2, '0');
        const mes = (obj.getMonth() + 1).toString().padStart(2, '0'); 
        const ano = obj.getFullYear();
        
        return `${dia}/${mes}/${ano}`;
    }


    const handleCloseUploadModal = () => {
        setOpenUploadModal(!openUploadModal);
    }

    const handleCloseDeleteodal = () => {
        setOpenDeleteModal(!openDeleteModal);
    }

    const handleOpenDelete = (id) => {
        setOpenDeleteModal(!openDeleteModal);
        setClientId(id);
    }
    

    return(
        <Box>
            <Box width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <FormControl sx={{ marginY: 4, width: 200 }}>
                    <InputLabel id="demo-simple-select-label">Campanhas</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Campanhas"
                        value={selectedCampaign}
                        onChange={(e) => setSelectedCampaign(e.target.value)}
                    >
                        <MenuItem value={'all'}>Todos</MenuItem>
                        {campaign && campaign.map((item, index) => {
                            return(
                                <MenuItem key={index + item.name} value={item.id}>{item.name}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <button onClick={() => setOpenUploadModal(!openUploadModal)}>Enviar arquivo</button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#C3C2C4' }}>
                            <TableCell sx={{ width: 160, p: 1 }}>Nome</TableCell>
                            <TableCell sx={{ width: 160, p: 1 }}>Email</TableCell>
                            <TableCell sx={{ width: 160, p: 1 }}>Telefone</TableCell>
                            <TableCell sx={{ width: 160, p: 1 }}>Endereço</TableCell>
                            <TableCell sx={{ width: 160, p: 1 }}>Cep</TableCell>
                            <TableCell sx={{ width: 160, p: 1 }}>Data de Nascimento</TableCell>
                            <TableCell sx={{ width: 160, p: 1 }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clients && clients.map((item, index) => {
                            return(
                                <TableRow key={item.first_name + '_' + item.second_name + index}>
                                    <TableCell sx={{ width: 160, p: 1 }}>{item.first_name + ' ' + item.second_name} </TableCell>
                                    <TableCell sx={{ width: 160, p: 1 }}>{item.email}</TableCell>
                                    <TableCell sx={{ width: 160, p: 1 }}>{formatPhoneNumber(item.phone)}</TableCell>
                                    <TableCell sx={{ width: 160, p: 1 }}>{item.address}</TableCell>
                                    <TableCell sx={{ width: 160, p: 1 }}>{item.cep}</TableCell>
                                    <TableCell sx={{ width: 160, p: 1 }}>{formatDate(item.birth_date)}</TableCell>
                                    <TableCell sx={{ width: 160, p: 1, textAlign: 'center', color: 'red', transition: ' 0.1s', ':hover': { cursor: 'pointer', color: '#9E2B2B' }, }}>
                                        <Box onClick={() => handleOpenDelete(item.id)}>
                                            <DeleteIcon  sx={{width: 40, height: 40}}/>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography color={textColor} display={'block'} my={2}>
                Nenhum dado encontrado
            </Typography>
            <UploadForm openModal={openUploadModal} func={handleCloseUploadModal}/>
            <DeleteCliente modal={openDeleteModal} func={handleCloseDeleteodal} clientId={clientId}/>
        </Box>
    )
}