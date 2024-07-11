package iitb.cs699.playerStatAnalyser.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

/**
 * Entity class for PlayerOverview, representing records in the 'player_overview' table.
 */
@Data
@Entity
@Table(name="player_overview")
public class PlayerOverview {
	
	
	@Id
	@Column(name ="row_id")
	private Integer rowId;	
	
	@Column(name ="p_id")
	private int pId;
	
	@Column(name = "full_name")
	private String fullName;
	
	private String born;
	
	private String age;
	
	@Column(name = "batting_style")
	private String battingStyle;
	
	@Column(name = "bowling_style")
	private String bowlingStyle;
	
	@Column(name = "playing_role")
	private String playingRole;
	
	private String roll_id;
	
	@Column(name = "photo_link")
	private String photoLink;



}
