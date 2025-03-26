import { useState } from "react";
import { Card, Button, Typography, List } from "antd";
import { getComputerChoice, checkWinner, initialGameState } from "@/services/RockPaperScissors";
import { Choice, GameState } from "@/models/RockPaperScissors";

const { Title, Text } = Typography;

const RockPaperScissors = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const handleUserChoice = (userChoice: Choice) => {
    const computerChoice = getComputerChoice();
    const result = checkWinner(userChoice, computerChoice);

    setGameState((prev) => ({
      userChoice,
      computerChoice,
      result,
      history: [...prev.history, { user: userChoice, computer: computerChoice, result }],
    }));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
      }}
    >
      <Card
        style={{
          width: 400,
          textAlign: "center",
          padding: 20,
          borderRadius: 15,
          background: "linear-gradient(135deg, #74b9ff 0%, #81ecec 100%)",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Title level={3} style={{ color: "#fff", textShadow: "2px 2px 4px rgba(0,0,0,0.2)" }}>
          ✊✋✌ Oẳn Tù Tì
        </Title>

        <Text style={{ fontSize: 16, color: "#fff" }}>Chọn một:</Text>
        <div style={{ margin: "15px 0" }}>
          {["Kéo", "Búa", "Bao"].map((choice) => (
            <Button
              key={choice}
              onClick={() => handleUserChoice(choice as Choice)}
              style={{
                margin: "5px",
                fontSize: 18,
                fontWeight: "bold",
                backgroundColor: "#ffffff",
                borderRadius: 8,
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
              }}
            >
              {choice}
            </Button>
          ))}
        </div>

        <Text style={{ fontSize: 16, color: "#fff" }}>
          Bạn chọn: <b>{gameState.userChoice || "❓"}</b>
        </Text>
        <br />
        <Text style={{ fontSize: 16, color: "#fff" }}>
          Máy chọn: <b>{gameState.computerChoice || "❓"}</b>
        </Text>
        <br />
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#ff4d4f", textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}>
          {gameState.result}
        </Text>

        <Title level={4} style={{ marginTop: 20, color: "#fff" }}>
          📜 Lịch sử trận đấu
        </Title>
        <List
          bordered
          size="small"
          style={{ background: "#fff", borderRadius: 8 }}
          dataSource={gameState.history}
          renderItem={(item, index) => (
            <List.Item>
              <Text>
                🏆 {index + 1}: {item.user} vs {item.computer} → <b>{item.result}</b>
              </Text>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default RockPaperScissors;
