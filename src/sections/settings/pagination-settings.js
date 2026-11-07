import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { apiRequest } from 'src/utils/api-request'
import { rowsPerPageOptions } from 'src/utils/util';
import { useAuth } from 'src/hooks/use-auth';



export const  PaginationSettings = (props) => {
    const { showError, showSuccess } = props
    const [sortingLables, setSortingLabels] = useState([])
    const [rowsPerPageObj , setRowPerPageObj] = useState({})
    const auth = useAuth()

    useEffect(()=> {
        // get all pagination setting labels
        apiRequest.get("/admin/pagination/all")
        .then(res => {
            const sortingLabels = Object.values(res.data);  // there we get a object with key ; value where in value we all detail about keys and rowNumbers
            const rowsPerPage = {}
            setSortingLabels(sortingLabels)
            sortingLabels.forEach(label => {
                let fieldFor = label.pagination?.fieldFor;
                rowsPerPage[fieldFor] = label.rowsNumber
            })
            setRowPerPageObj(rowsPerPage)
        })
        .catch(err=>{
            showError(err);
        })
        
    },[showError])

    // TODO ; make sure call from auth-context or redux side 
    const handleChange = (event,pagination) => {
        let rowsNumber = event.target.value;
        apiRequest.post("/admin/pagination/update", {
            paginationId : pagination.id,
            rowsNumber : rowsNumber
        })
        .then(res => {
            showSuccess(res.data.message)
        })
        .catch(err => {
            showError(err);
        })
        setRowPerPageObj((previous) => ({
            ...previous,
            [pagination?.fieldFor]: rowsNumber
        }))
        // updated with redux also 
        auth.updatePaginations(rowsNumber,pagination)
    };

  return (<>
        <Card>
                <CardHeader
                subheader="Show per page rows"
                title="Rows per page"
                />
                <Divider />
                <CardContent>
                <Grid
                    container
                    spacing={6}
                    wrap="wrap"
                >
            
                    <Grid
                    item
                    md={8}
                    sm={6}
                    xs={12}
                    >
                        <Stack spacing={1}>
                        {sortingLables.map((label,key)=>{
                            let fieldFor = label.pagination?.fieldFor;
                            return (
                                <Box key={key}
sx={{display  : 'flex', alignItems : 'center',justifyContent : 'center'}}>
                                        <Typography sx={{minWidth : 150}}
variant="h6">
                                            {label.pagination?.fieldFor}
                                        </Typography>

                                        <FormControl fullWidth
sx={{mx : 3}}> 
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={rowsPerPageObj[fieldFor]}
                                                onChange={(e) => handleChange(e,label.pagination)}
                                            >
                                                {rowsPerPageOptions.map((value , index)=>{
                                                    return <MenuItem key={index}
value={value}>{value}</MenuItem>
                                                })}

                                            </Select>
                                        </FormControl>
                                </Box>
                              
                         
                              
                            )
                        })}
                        </Stack>
                    </Grid>
                </Grid>
                </CardContent>
            </Card>
</>
  )
}
