import React, {Fragment} from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';

import {CustomButton} from '../components/custom_buttons';
import {PlayerView} from '../components/player_view';
import {loadingPreviusPlay, setApp, useApp, useGames} from '../lib/stores';
import {
  bannerBackgroundColor,
  fontSizes,
  spacing,
  topBarBackgroundColor,
  topBarButtonWidth,
} from '../lib/theme';

interface GameProps {
  gameId: number;
}

export const GamePage: React.FC<GameProps> = (props) => {
  const [app] = useApp();
  const [games] = useGames();
  const game = games.filter((g) => g.id === props.gameId)[0];
  if (game === undefined) {
    return <Fragment />;
  }
  return (
    <Wrapper>
      <TopBar>
        <CustomButton
          text="Accueil"
          icon="home"
          onPress={() => setApp({...app, currentPage: 'accueil'})}
          width={topBarButtonWidth}
        />
        <Titre>{`Partie`}</Titre>
        <CustomButton
          text="Edition"
          icon="pencil-outline"
          onPress={() => setApp({...app, currentPage: 'editGame'})}
          width={topBarButtonWidth}
        />
      </TopBar>
      <LastPlay>
        <Text>{game.lastPlay}</Text>
      </LastPlay>
      <WrapperCancel>
        <CustomButton
          text="Annuler le dernier lancé"
          icon="undo"
          size="large"
          onPress={() => loadingPreviusPlay(game)}
          hidden={game.lastGame === undefined}
        />
      </WrapperCancel>
      <PlayerScrollView>
        {game.players.map((p) => (
          <PlayerView
            key={p.id}
            gameId={game.id}
            playerId={p.id}
            isCurrentPlayer={p.id === game.currentPlayerId}
          ></PlayerView>
        ))}
      </PlayerScrollView>
    </Wrapper>
  );
};
GamePage.displayName = 'Game';

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const TopBar = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-shrink: 0;
  background-color: ${topBarBackgroundColor};
  padding: ${spacing / 2}px;
`;

const Titre = styled.Text`
  font-size: ${fontSizes.medium}px;
  flex-grow: 1;
  text-align: center;
`;

const LastPlay = styled.View`
  display: flex;
  align-items: center;
  background-color: ${bannerBackgroundColor};
  margin-top: ${spacing}px;
  padding: ${spacing}px;
`;

const PlayerScrollView = styled.ScrollView`
  margin: ${spacing}px;
  margin-bottom: 0;
`;

const WrapperCancel = styled.View`
  margin: ${spacing}px;
  margin-bottom: 0px;
`;
