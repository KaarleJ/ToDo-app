package com.todo.todoserver.config;

import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

  private static final String SECRET_KEY = System.getenv("SECRET_KEY");
  
  public String extractUsername(String jwt) {
    return extractClaim(jwt, Claims::getSubject);
  }
 
  private Claims extractAllClaims(String jwt) {
    return Jwts
      .parserBuilder()
      .setSigningKey(getSigningKey())
      .build()
      .parseClaimsJws(jwt)
      .getBody();
  }

  public boolean isTokenValid(String jwt, UserDetails userDetails) {
    final String username = extractUsername(jwt);
    return (username.equals(userDetails.getUsername()) && !isTokenExpired(jwt));
  }

  public boolean isTokenExpired(String jwt) {
    return extractExpiration(jwt).before(new Date());
  }

  private Date extractExpiration(String jwt) {
    return extractClaim(jwt, Claims::getExpiration);
  }

  public String generateToken(UserDetails userDetails) {
    return generateToken(Map.of(), userDetails);
  }

  public String generateToken(Map<String, Object> claims, UserDetails userDetails) {
    return Jwts
      .builder()
      .setClaims(claims)
      .setSubject(userDetails.getUsername())
      .setIssuedAt(new Date(System.currentTimeMillis()))
      .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
      .signWith(getSigningKey(), SignatureAlgorithm.HS256)
      .compact();
  };

  public <T> T extractClaim(String jwt, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(jwt);
    return claimsResolver.apply(claims);
  }

  private Key getSigningKey() {
    byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
    return Keys.hmacShaKeyFor(keyBytes);
  }
}
