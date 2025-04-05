import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function App() {
  const [player, setPlayer] = useState("Player: X");
  const [winState, setWinState] = useState(false);

  const [grid, setGrid] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  console.log(`This is grid: ${grid}`);

  const Press = (event, row, col) => {
    if (grid == undefined) {
      console.log("grid undefined");
      return;
    }

    if (player == "Player: X" && grid[row][col] == "") {
      // console.log(event.target);

      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((row) => [...row]); // ✅ copy inner arrays
        if (newGrid.myProperty == undefined) {
          console.log("undefined");
          return;
        }
        newGrid[row][col] = "X";
        checkWinner(newGrid);
        // console.log(newGrid);
        // console.log(newGrid[row][col]);
        return newGrid;
      });

      setPlayer("Player: O");
    } else if (player == "Player: O" && grid[row][col] == "") {
      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((row) => [...row]); // ✅ copy inner arrays
        // console.log(newGrid);
        // console.log(newGrid[row][col]);

        newGrid[row][col] = "O";
        if (newGrid.myProperty == undefined) {
          console.log("undefined");
          return;
        }
        checkWinner(newGrid);
        // console.log(newGrid);
        return newGrid;
      });
      checkWinner();
      setPlayer("Player: X");
      console.log("Player: X");
    }
  };

  const checkWinner = (newGrid) => {
    // Check rows
    console.log(typeof newGrid);

    for (let i = 0; i < 3; i++) {
      console.log(newGrid[i][0]);
      if (
        newGrid[i][0] !== "" &&
        newGrid[i][0] === newGrid[i][1] &&
        newGrid[i][1] === newGrid[i][2]
      ) {
        setWinState(true);
        return;
      }
    }
    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        newGrid[0][i] !== "" &&
        newGrid[0][i] === newGrid[1][i] &&
        newGrid[1][i] === newGrid[2][i]
      ) {
        setWinState(true);
        return;
      }
    }

    // Check diagonals
    if (
      newGrid[0][0] !== "" &&
      newGrid[0][0] === newGrid[1][1] &&
      newGrid[1][1] === newGrid[2][2]
    ) {
      setWinState(true);

      return;
    }
    if (
      newGrid[0][2] !== "" &&
      newGrid[0][2] === newGrid[1][1] &&
      newGrid[1][1] === newGrid[2][0]
    ) {
      setWinState(true);
      return;
    }
    if (winState) {
      Alert.alert("Winner", `${player} wins!`, [
        { text: "OK", onPress: () => newGame() },
      ]);
    }
  };

  const newGame = () => {
    setGrid([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setWinState(false);
    setPlayer("Player: X");
  };

  const Easy = () => {
    var list = [];
    var num = 0;
    for (let i = 0; i < 3; i++) {
      var rows = [];
      for (let j = 0; j < 3; j++) {
        var adjustcss = [];
        adjustcss.push(styles.box);

        if (i < 3 && j < 2) {
          adjustcss.push(styles.rightBorder);
        }
        if (j < 2 && i < 2) {
          adjustcss.push(styles.bottomBorder);
        }
        if (i == 0 && j == 2) {
          adjustcss.push(styles.bottomBorder);
        }
        if (i == 1 && j == 2) {
          adjustcss.push(styles.bottomBorder);
        }
        // {console.log(`This is i: ${i}`)}
        // {console.log(`This is j: ${j}`)}
        // {console.log(`This is cell-Top: cell-${i}-${j}`)}
        rows.push(
          <TouchableOpacity
            onPress={(event, row = i, col = j) => Press(event, row, col)}
          >
            <View style={adjustcss}>
              <Text style={styles.item}></Text>
            </View>
          </TouchableOpacity>
        );
        num += 1;
      }
      list.push(<Row keys={i}>{rows}</Row>);
      // console.log(list);
    }
    return list;
  };

  const Row = ({ children }) => <View style={styles.row}>{children}</View>;


  return (
    <View key="24234" style={styles.container}>
      <Text key={2} style={styles.title}>
        Tic Tac Toe
      </Text>
      <View style={styles.playerAndGrid}>
        <Text style={styles.player}>{player}</Text>
        <View style={styles.grid}>
          <Easy key="3432"></Easy>
        </View>
        <TouchableOpacity onPress={newGame}>
          <Text key="43432432" style={[styles.title, styles.niceButton]}>
            New Game
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "white",
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  niceButton: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    backgroundColor: "yellow",
  },

  playerAndGrid: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: -35,
  },
  player: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  grid: {},
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "#3187A2",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    fontSize: 24,
  },
  rightBorder: {
    borderRightWidth: 1,
    borderRightColor: "black",
  },
  leftBorder: {
    borderLeftWidth: 1,
    borderLeftColor: "black",
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  topBorder: {
    borderTopWidth: 1,
    borderTopColor: "black",
  },
  color: {
    backgroundColor: "red",
  },
  color2: {
    backgroundColor: "lightblue",
  },
  color3: {
    backgroundColor: "green",
  },
  test: {
    backgroundColor: "red",
  },
});
