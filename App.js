import { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import Card from './components/Card.js'
import BlankCard from './components/BlankCard.js'
import GestureRecognizer, { swipeDirections } from "react-native-swipe-gestures";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;

export default function App() {

  var [board, setBoard] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ])
  var [score, setScore] = useState(0)
  var [bestScore, setBestScore] = useState(0)
  var [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    getBestScore()
    initializeBoard()
  }, []);

  useEffect(() => {
    if (score > bestScore) {
      setNewBestScore()
      setBestScore(score)
    }
  }, [score]);

  async function setNewBestScore() {
    try {
      await AsyncStorage.setItem('bestScore', JSON.stringify(score))
    } catch (e) {
      alert(e)
    }
  }

  async function getBestScore() {
    try {
      const value = await AsyncStorage.getItem('bestScore')
      if (value !== null) {
        setBestScore(parseInt(value))
      }
    } catch (e) {
      alert(e)
    }
  }

  function getRandomNumber() {
    return (Math.random() * (3 - 0)).toFixed(0)
  }

  function initializeBoard() {
    setScore(0)
    var temporaryBoard = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
    for (var i = 0; i < 2; i++) {
      var one = getRandomNumber()
      var two = getRandomNumber()

      if (temporaryBoard[one][two] != 0) {
        while (temporaryBoard[one][two] != 0) {
          var one = getRandomNumber()
          var two = getRandomNumber()
        }
      }

      temporaryBoard[one][two] = 2
    }
    setBoard(temporaryBoard)
  }

  function addCard(newBoard) {
    var temporaryBoard = [...board]
    var one = getRandomNumber()
    var two = getRandomNumber()

    if (temporaryBoard[one][two] != 0) {
      while (temporaryBoard[one][two] != 0) {
        var one = getRandomNumber()
        var two = getRandomNumber()
      }
    }

    temporaryBoard[one][two] = 2
    setBoard(temporaryBoard)
  }

  function checkGameOver() {

    if (gameOver) return

    var counter = 0
    for (var z = 0; z < 3; z++) {
      for (var i = 0; i < 3; i++) {
        if (board[z][i] != 0 && board[z][i + 1] != 0 && board[z + 1][i] != 0) {
          if (board[z][i] != board[z][i + 1]) counter++
          else return

          if (board[z][i] != board[z + 1][i]) counter++
          else return

        } else {
          return
        }
      }
    }
    return counter
  }

  function makeMove(direction) {
    if (checkGameOver() != undefined || gameOver) {
      setGameOver(true)
      console.log('game over')
      return
    }

    var temporaryBoard = [...board]

    if (direction == 'right') {
      for (var col = 0; col < temporaryBoard.length; col++) {
        for (var j = 0; j < 3; j++) {
          for (var i = 3; i > 0; i--) {
            if (temporaryBoard[i][col] == 0) {
              temporaryBoard[i][col] = temporaryBoard[i][col] + temporaryBoard[i - 1][col];
              temporaryBoard[i - 1][col] = 0;
            } else if (temporaryBoard[i][col] == temporaryBoard[i - 1][col] && temporaryBoard[i][col] != 0) {
              temporaryBoard[i][col] = temporaryBoard[i][col] + temporaryBoard[i - 1][col];
              temporaryBoard[i - 1][col] = 0;
              j++;
              setScore(score + parseInt(temporaryBoard[i][col]));
            }
          }
        }
      }
    } else if (direction == 'left') {
      for (var col = 0; col < temporaryBoard.length; col++) {
        for (var j = 0; j < 3; j++) {
          for (var i = 0; i < 3; i++) {
            if (temporaryBoard[i][col] == 0) {
              temporaryBoard[i][col] = temporaryBoard[i][col] + temporaryBoard[i + 1][col];
              temporaryBoard[i + 1][col] = 0;
            } else if (temporaryBoard[i][col] == temporaryBoard[i + 1][col] && temporaryBoard[i][col] != 0) {
              temporaryBoard[i][col] = temporaryBoard[i][col] + temporaryBoard[i + 1][col];
              temporaryBoard[i + 1][col] = 0;
              j++;
              setScore(score + parseInt(temporaryBoard[i][col]));
            }
          }
        }
      }
    } else if (direction == "up") {
      for (var row = 0; row < temporaryBoard.length; row++) {
        for (var j = 0; j < 3; j++) {
          for (var i = 0; i < 3; i++) {
            if (temporaryBoard[row][i] == 0) {
              temporaryBoard[row][i] = temporaryBoard[row][i] + temporaryBoard[row][i + 1];
              temporaryBoard[row][i + 1] = 0;
            } else if (temporaryBoard[row][i] == temporaryBoard[row][i + 1] && temporaryBoard[row][i] != 0) {
              temporaryBoard[row][i] = temporaryBoard[row][i] + temporaryBoard[row][i + 1];
              temporaryBoard[row][i + 1] = 0;
              j++;
              setScore(score + parseInt(temporaryBoard[row][i]));
            }
          }
        }
      }
    } else if (direction == "down") {
      for (var row = 0; row < temporaryBoard.length; row++) {
        for (var j = 0; j < 3; j++) {
          for (var i = 3; i > 0; i--) {
            if (temporaryBoard[row][i] == 0) {
              temporaryBoard[row][i] = temporaryBoard[row][i] + temporaryBoard[row][i - 1];
              temporaryBoard[row][i - 1] = 0;
            } else if (temporaryBoard[row][i] == temporaryBoard[row][i - 1] && temporaryBoard[row][i] != 0) {
              temporaryBoard[row][i] = temporaryBoard[row][i] + temporaryBoard[row][i - 1];
              temporaryBoard[row][i - 1] = 0;
              j++;
              setScore(score + parseInt(temporaryBoard[row][i]));
            }
          }
        }
      }
    }
    setBoard(temporaryBoard)
    addCard(false)
  }

  return (

    <View style={styles.container}>
      <GestureRecognizer
        onSwipeLeft={() => makeMove('left')}
        onSwipeRight={() => makeMove('right')}
        onSwipeUp={() => makeMove('up')}
        onSwipeDown={() => makeMove('down')}
      >
        <Text>{gameOver ? "Game Over" : ""}</Text>
        <View style={styles.topBarContainer}>
          <View style={styles.scoresContainer}>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>Score: {score}</Text>
            </View>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>Best Score: {bestScore}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => initializeBoard()} style={styles.reloadButton}>
            <MaterialCommunityIcons name="reload" size={32} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.boardContainer}>
          <View style={styles.row}>
            {board[0][0] == 0 ? <BlankCard /> : <Card value={board[0][0]} />}
            {board[0][1] == 0 ? <BlankCard /> : <Card value={board[0][1]} />}
            {board[0][2] == 0 ? <BlankCard /> : <Card value={board[0][2]} />}
            {board[0][3] == 0 ? <BlankCard /> : <Card value={board[0][3]} />}
          </View>
          <View style={styles.row}>
            {board[1][0] == 0 ? <BlankCard /> : <Card value={board[1][0]} />}
            {board[1][1] == 0 ? <BlankCard /> : <Card value={board[1][1]} />}
            {board[1][2] == 0 ? <BlankCard /> : <Card value={board[1][2]} />}
            {board[1][3] == 0 ? <BlankCard /> : <Card value={board[1][3]} />}
          </View>
          <View style={styles.row}>
            {board[2][0] == 0 ? <BlankCard /> : <Card value={board[2][0]} />}
            {board[2][1] == 0 ? <BlankCard /> : <Card value={board[2][1]} />}
            {board[2][2] == 0 ? <BlankCard /> : <Card value={board[2][2]} />}
            {board[2][3] == 0 ? <BlankCard /> : <Card value={board[2][3]} />}
          </View>
          <View style={styles.row}>
            {board[3][0] == 0 ? <BlankCard /> : <Card value={board[3][0]} />}
            {board[3][1] == 0 ? <BlankCard /> : <Card value={board[3][1]} />}
            {board[3][2] == 0 ? <BlankCard /> : <Card value={board[3][2]} />}
            {board[3][3] == 0 ? <BlankCard /> : <Card value={board[3][3]} />}
          </View>
        </View>
      </GestureRecognizer>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boardContainer: {
    flexDirection: 'row',
    backgroundColor: '#BBADA0',
    padding: 10,
    width: windowWidth
  },
  row: {
    width: windowWidth / 4.6 + 10,
    flexDirection: 'column'
  },
  scoreText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  },
  reloadButton: {
    width: 40,
    height: 40,
    backgroundColor: '#EDC53F',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  scoreContainer: {
    padding: 10,
    backgroundColor: '#3E3933',
    borderRadius: 5,
    margin: 5,
    minWidth: 220
  },
  topBarContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center'
  },
  scoresContainer: {
    alignItems: 'flex-start',
    width: '80%'
  }
});
