package iitb.cs699.playerStatAnalyser.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="player_overview")
public class PlayerOverview {
	
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private int row_id;	
	
	@Column(name ="p_id")
	public int pId;
	
	@Column(name = "full_name")
	public String fullName;
	
	public String born;
	
	public String age;
	
	@Column(name = "batting_style")
	public String battingStyle;
	
	@Column(name = "bowling_tyle")
	public String bowlingStyle;
	
	@Column(name = "playing_role")
	public String playingRole;
	
	public String roll_id;
	
	@Column(name = "photo_link")
	public String photoLink;



}
