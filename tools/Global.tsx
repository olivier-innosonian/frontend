import { Container, createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import React, { useState, useEffect, Dispatch } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlayerBanner from '../components/PlayerBanner';
import SearchAppBar from '../components/SearchBar';
import TagList from '../components/TagList'
import RankCard from '../components/RankCard'
import GameSummaryTab from '../components/GameSummaryTab'
import ChampionStatTab from '../components/ChampionStatTab'
import HistoryCard from '../components/HistoryCard'
import { Provider, useDispatch, useSelector } from 'react-redux';
import { ISummonerSummary, PreviousTier } from '../redux/type/summonerSummary';
import { GlobalState } from '../redux/type/global';
import { getSumonerSummary } from '../redux/actionSummonerSummary';
import { getGameData } from '../redux/actionGameData';
import { IGameData } from '../redux/type/gameData';
import { getChampionUsage } from '../redux/actionChampionUsage';
import { IChampionUsage } from '../redux/type/championUsage';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    line: {
      borderTop: "1px solid #d8d8d8",

    },
    marginContainer:{
      marginTop: "15px",
      display: "flex",
      justify:"center",
      alignItems:"flex-start"
    

    },
    statsDataContainer: {
      display: "flex",
      paddingTop: "15px",
      justifyContent: "center",
      alignItems: "center",
    }
  })

)

export default function Global() {
    const [input, setInput] = useState('');
    const classes = useStyles();
    const dispatch: Dispatch<any> = useDispatch();
  
      const sumSummaery: ISummonerSummary | undefined = useSelector(
          (state: GlobalState) => state.summonerSummatry.summoner
        );
        const championUsage: IChampionUsage | undefined = useSelector(
          (state: GlobalState) => state.championUsage.championUsage as IChampionUsage
        );
        
     
  
        useEffect(() => {
          dispatch(getSumonerSummary("{summonerName}"));
          dispatch(getChampionUsage("{summonerName}"));

          dispatch(getGameData("{summonerName}"))


        }, []);
  
    return (
        <View >
      <SearchAppBar
      />
      <Container>

        <TagList previousTiers={sumSummaery?.summoner.previousTiers as [PreviousTier]} />
        <PlayerBanner />
      </Container>
      <div className={classes.line}>
        <Container>
          <Grid container spacing={3} className={classes.marginContainer}>
            <Grid item container  className={classes.statsDataContainer} direction="row" spacing={3} xs={4}>
              <Grid item xs={12}> <RankCard leagues={sumSummaery?.summoner.leagues}/></Grid>
              <Grid item xs={12}> <ChampionStatTab /></Grid>
            </Grid>
            <Grid item xs={8}>
              <Grid item container direction="row" spacing={3} xs={12}>
                <Grid item xs={12}> <GameSummaryTab /></Grid>
                <Grid item xs={12}> <HistoryCard /></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </View>
    )
}
