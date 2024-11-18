let websocket: WebSocket;

export function setup(
  onGamelogFound: (log: string[][] | null, title: string | null) => void,
  onSummaryFound: (summary: object | null) => void,
  onPlayerNamesFound: (players: string[], bots: string[]) => void,
  onPlayerAdded: (player: string) => void,
  onConnectionOpen: () => void,
) {
  const PORT = 3001;
  if (websocket) {
    return;
  }
  websocket = new WebSocket('ws://localhost:' + PORT + '/ws');

  websocket.onopen = function(event) {
    const id = setInterval(() => {
      if (websocket.readyState === websocket.OPEN) {
        console.log('WebSocket connection opened');
        onConnectionOpen();
        clearInterval(id);
      }
    }, 100);
  };

  websocket.onmessage = function(event) {
    console.log("websocket message", event);
    const data = JSON.parse(event.data);
    if (data.type === 'gamelog_found') {
      onGamelogFound(
        data['log'].map((log: string) => log.split("\n")),
        data['game_title']);
    } else if (data.type === 'gamelog_missing'){
      onGamelogFound(null, null);
    } else if (data.type === 'player_names_found') {
      onPlayerNamesFound(data['player_names'], data['bot_names']);
    } else if (data.type === 'script_uploaded') {
      onPlayerAdded(data['player_id']);
    } else if (data.type === 'summary_found') {
      onSummaryFound(data['summary']);
    } else if (data.type === 'summary_missing') {
      const player1 = data['player1_name']
      const player2 = data['player2_name']
      if (player1 && player2 && player1 !== player2) {
        playGame(player1, player2);
      }
    }
  };

  websocket.onclose = function(event) {
    console.log('WebSocket connection closed');
  };

  websocket.onerror = function(error) {
    console.error('WebSocket error:', error);
  };

  return websocket;
}

export function requestGamelog(player1_name: string, player2_name: string): void {
  console.log("Fetching gamelog: " + player1_name + " vs " + player2_name);
  const message = {
    type: 'fetch_gamelog',
    player1_name,
    player2_name,
  };
  websocket.send(JSON.stringify(message));
}

export function requestSummary(player1_name: string, player2_name: string): void {
  console.log("Fetching summary: " + player1_name + " vs " + player2_name);
  const message = {
    type: 'fetch_summary',
    player1_name,
    player2_name,
  };
  websocket.send(JSON.stringify(message));
}

export function requestPlayerNames() {
  console.log("Fetching player names");
  const message = {
    type: 'fetch_player_names',
  };
  websocket.send(JSON.stringify(message));
}

export function addPlayer(bot_name: string, script: string, file_type: string): void {
  console.log("Adding player: " + bot_name);
  const message = {
    type: 'upload_bot_script',
    bot_name,
    script,
    file_type,
  };
  websocket.send(JSON.stringify(message));
}

export function playGame(player1_id: string, player2_id: string): void {
  console.log("Playing game: " + player1_id + " vs " + player2_id);
  const message = {
    type: 'play_game',
    player1_id,
    player2_id,
  };
  websocket.send(JSON.stringify(message));
}