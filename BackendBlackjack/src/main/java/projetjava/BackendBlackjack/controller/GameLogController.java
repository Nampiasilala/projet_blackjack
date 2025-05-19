package projetjava.BackendBlackjack.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projetjava.BackendBlackjack.model.GameLog;
import projetjava.BackendBlackjack.service.GameLogService;
import projetjava.BackendBlackjack.dto.GamePlayDTO;

@RestController
@RequestMapping("/api/game_logs")
@CrossOrigin(origins = "http://localhost:5173")
public class GameLogController {

    private final GameLogService gameLogService;

    public GameLogController(GameLogService gameLogService) {
        this.gameLogService = gameLogService;
    }

    @PostMapping("/play")
    public ResponseEntity<?> jouerPartie(@RequestBody GamePlayDTO request) {
        try {
            GameLog gameLog = gameLogService.jouerPartie(
                    request.getUserId(),
                    request.getMise(),
                    request.getGain(),
                    request.getResultat());
            return ResponseEntity.ok(gameLog);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{userId}")
public ResponseEntity<?> getGameLogsByUserId(@PathVariable Long userId) {
    try {
        return ResponseEntity.ok(gameLogService.getGameLogsByUserId(userId));
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body("Erreur lors de la récupération des logs.");
    }
}

}
