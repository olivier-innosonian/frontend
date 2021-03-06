import React, { Dispatch, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import ChampionStatCell from "./ChampionStatCell"
import RankWinStatCell from "./RankWinStatCell"
import { GlobalState } from '../redux/type/global';
import { useDispatch, useSelector } from 'react-redux';
import { IChampionUsage } from '../redux/type/championUsage';
import { ISummonerSummary } from '../redux/type/summonerSummary';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,

    },
    bigText: {
      fontSize: "14px",
      fontFamily: "Helvetica"
    },
    smallText: {
      fontSize: "11px",
      fontFamily: "Helvetica"
    },
    mediumText: {
      fontSize: "12px",
      fontFamily: "Helvetica"
    },
    rbigText: {
      fontSize: "16px",
      fontFamily: "Helvetica"
    },
    textBold: {
      fontWeight: "bold",

    },
    greenWR: { color: "#2daf7f" },
    redWR: { color: "#c6443e" },
    yellowWR: { color: "#e19205" }


  }));

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  const championUsage: IChampionUsage | undefined = useSelector(
    (state: GlobalState) => state.championUsage.championUsage
  )



  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && value === 0 as typeof value && (
        <ChampionStatCell champData={championUsage?.champions} key="champstat" />
      )}
      {value === index && value === 1 as typeof value && (
        <RankWinStatCell rankData={championUsage?.recentWinRate} key="rankwin" />
      )}
    </div>
  );
}


/// have to loop over taglist
export default function ChampionStatTab() {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState<Number>(0);


  const handleChange = (e: React.ChangeEvent<{}>, value: any) => {
    setTabIndex(value as Number)
  }

  return (
    <div className={classes.root}>

      <Paper variant="outlined" square>
        <Grid container spacing={0} alignContent="center" alignItems="center">

          <Grid item xs={12}>
            <Tabs
              value={tabIndex}
              onChange={handleChange}
            >
              <Tab label="Champion Win Ratio" />
              <Tab label="Rank win rate per week" />

            </Tabs>
          </Grid>
          <Grid item xs={12}>

            <TabPanel value={tabIndex} index={0}>
              Champion Win Ratio
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
              Rank win rate per week

            </TabPanel>

          </Grid>
        </Grid>
      </Paper>
    </div>


  );
}


