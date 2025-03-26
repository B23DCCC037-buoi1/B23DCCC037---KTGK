import { Input, Button, Typography, Card } from "antd";
import { useRandomGame } from "@/models/RandomGame"; 
import { ReloadOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const RandomGame = () => {
  const { game, guess, setGuess, checkGuess, resetGame } = useRandomGame();

  return (
    <Card
      style={{
        width: 400,
        margin: "50px auto",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <Title level={3}>🎯 Trò chơi đoán số</Title>
      <Text>Đoán số từ 1 đến 100:</Text>
      <br />
      <Input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        style={{ width: "100px", margin: "10px 0" }}
      />
      <br />
      <Button onClick={checkGuess} type="primary">
        Dự đoán
      </Button>
      <Button
        onClick={resetGame}
        icon={<ReloadOutlined />}
        style={{ marginLeft: "10px" }}
      >
        Chơi lại
      </Button>
      <br />
      <Text strong style={{ color: game.gameOver ? "red" : "black" }}>
        {game.message}
      </Text>
      <br />
      <Text>Còn lại: {game.attempts} lượt</Text>
    </Card>
  );
};

export default RandomGame;
