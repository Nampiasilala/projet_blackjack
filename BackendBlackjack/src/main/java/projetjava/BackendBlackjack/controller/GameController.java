package projetjava.BackendBlackjack.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import projetjava.BackendBlackjack.model.GameSession;
import projetjava.BackendBlackjack.repository.GameSessionRepository;
import java.util.List;

@RestController
@RequestMapping("/api/games")
public class GameController {

    @Autowired
    private GameSessionRepository gameSessionRepository;

    @PostMapping
    public GameSession createGame(@RequestBody GameSession gameSession) {
        return gameSessionRepository.save(gameSession);
    }

    @GetMapping
    public List<GameSession> getAllGames() {
        return gameSessionRepository.findAll();
    }
}