package projetjava.BackendBlackjack.service;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import projetjava.BackendBlackjack.dto.AuthRequest;
import projetjava.BackendBlackjack.dto.AuthResponse;
import projetjava.BackendBlackjack.model.Utilisateur;
import projetjava.BackendBlackjack.repository.UtilisateurRepository;
import projetjava.BackendBlackjack.security.JwtUtil;

@Service
public class AuthService {

    private final UtilisateurRepository utilisateurRepository;
    private final JwtUtil jwtUtil;

    public AuthService(UtilisateurRepository utilisateurRepository, JwtUtil jwtUtil) {
        this.utilisateurRepository = utilisateurRepository;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse authenticate(AuthRequest request) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Email ou mot de passe incorrect"
                ));

        if (!BCrypt.checkpw(request.getPassword(), utilisateur.getPasswordHash())) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Email ou mot de passe incorrect"
            );
        }

        return new AuthResponse(
                jwtUtil.generateToken(utilisateur),
                utilisateur.getId(),
                utilisateur.getEmail()
        );
    }
}
