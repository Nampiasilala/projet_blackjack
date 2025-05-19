package projetjava.BackendBlackjack.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import projetjava.BackendBlackjack.model.GameLog;
import projetjava.BackendBlackjack.model.Utilisateurs;
import projetjava.BackendBlackjack.repository.GameLogRepository;
import projetjava.BackendBlackjack.repository.UtilisateurRepository;
import java.util.Optional;
import java.util.List;

@Service
public class GameLogService {

    @Autowired
    private GameLogRepository gameLogRepository;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    public List<GameLog> getGameLogsByUserId(Long userId) {
        return gameLogRepository.findByUtilisateur_Id(userId);
    }
    public GameLog jouerPartie(Long userId, Double mise, Double gain, String resultat) {
        Utilisateurs utilisateur = utilisateurRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        Double balanceActuelle = utilisateur.getBalance();

        if (mise > balanceActuelle) {
            throw new RuntimeException("Solde insuffisant pour miser");
        }

        Double newBalance = balanceActuelle - mise + gain;

        // Mise à jour du solde utilisateur
        utilisateur.setBalance(newBalance);
        utilisateurRepository.save(utilisateur);

        // Enregistrement du jeu
        GameLog gameLog = new GameLog();
        gameLog.setUtilisateur(utilisateur);
        gameLog.setMise(mise);
        gameLog.setGain(gain);
        gameLog.setResultat(resultat);
        gameLog.setBalanceApres(newBalance);

        return gameLogRepository.save(gameLog);
    }
}
