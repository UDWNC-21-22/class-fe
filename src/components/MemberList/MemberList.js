import React, { useState } from "react";
import { Avatar, Container, Grid, makeStyles, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { Table } from "@material-ui/core";
import Drawer from '../Drawer/Drawer'
import { color } from "@mui/system";

const Names = [
    { id: '1', FullName: "Đình Khôi" },
    { id: '2', FullName: 'Hồ An' },
    { id: '3', FullName: 'Trâm Ngân' }
]

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'center'
    },
    table: {
        width: '70%'
    },
    tableCell: {
        width: '40px'
    },
    role: {
        marginTop: theme.spacing(5),
        width: '70%',
    }
}))

const MemberList = () => {
    const styles = useStyles();
    const [memberList, setMemberList] = useState();
    const [classmatesNumber, setClassmatesNumber] = useState(Names.length);

    

    return (
        <div>
            {/* <Drawer /> */}
            <Container fixed >
                <div className={styles.container}>
                    <Table className={styles.role}>
                        <TableBody>
                            <TableRow>
                                <TableCell color='blue'><h2>Teacher</h2></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div className={styles.container}>
                    <Table className={styles.table}>
                        <TableBody>
                            {
                                Names.map((item) => (
                                    <TableRow>
                                        <TableCell className={styles.tableCell}><Avatar /></TableCell>
                                        <TableCell>{item.FullName}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
                <div className={styles.container}>
                    <Table className={styles.role}>
                        <TableBody>
                            <TableRow style={{color: 'blue'}}>
                                <TableCell><h2>Classmates</h2></TableCell>
                                <TableCell align='right'><p>{classmatesNumber} students</p></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div className={styles.container}>
                    <Table className={styles.table}>
                        <TableBody>
                            {
                                Names.map((item) => (
                                    <TableRow>
                                        <TableCell className={styles.tableCell}><Avatar /></TableCell>
                                        <TableCell>{item.FullName}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
            </Container>
        </div>
    )
}

export default MemberList;