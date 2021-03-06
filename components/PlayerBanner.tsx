import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import { ISummonerSummary } from '../redux/type/summonerSummary';
import { GlobalState } from '../redux/type/global';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            borderBottom: "1px",
            padding: "15px",


        },
        name: {
            fontFamily: "Helvetica",
            fontSize: "20px",
            fontWeight: "bold",
            letterSpacing: "-0.77px",
            color: "#242929",
        },
        desc: {
            fontFamily: " Helvetica",
            fontSize: "11px",
            color: "#657070",
        },
        textGrid: {
            height: "100%"
        },
        badge: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
            position: 'absolute',
        },
        image: {
            //  backgroundImage: "url(https://opgg-static.akamaized.net/images/profile_icons/profileIcon1625.jpg)",
            backgroundPosition: "center", /* Center the image */
            backgroundRepeat: "no-repeat", /* Do not repeat the image */
            backgroundSize: "85%" /* Resize the background image to cover the entire container */
        },
        level: {
            zIndex: 100,
            position: 'absolute',
            color: "#eabd56"
            //  marginTop: "-14px",
            //  backgroundImage: "url('../assets/bglevelbox.png')",
        },
        portrait: {
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
        }
    }));

export default function PlayerBanner() {
    const classes = useStyles();

    const sumSummaery: ISummonerSummary | undefined = useSelector(
        (state: GlobalState) => state.summonerSummatry.summoner
    );

    return (
        <div >

            <Grid container direction="row" className={classes.root} spacing={5} >
                <Grid item xs={1} >
                    <Grid container item xs={12} className={classes.portrait} >

                        <img className={classes.image} style={{ backgroundImage: "url(" + sumSummaery?.summoner.profileImageUrl + ")" }} src={"" + sumSummaery?.summoner.profileBorderImageUrl + ""} />
                        <Grid item xs={12} className={classes.badge}>
                            <img src={require('../assets/bglevelbox.png')} />

                            <Typography className={classes.level} >{sumSummaery?.summoner.level}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container direction="column" spacing={3} item xs={11} >
                    <Grid item xs={1} className={classes.name}>{sumSummaery?.summoner.name}
                    </Grid>
                    <Grid item xs={8} >
                        <Typography className={classes.desc} component='div'>Ladder Rank <Box fontWeight='fontWeightBold' display='inline'>{sumSummaery?.summoner.ladderRank.rank}</Box> ({sumSummaery?.summoner.ladderRank.rankPercentOfTop}% of top)</Typography>
                    </Grid>

                </Grid>
            </Grid>

        </div>
    );
}