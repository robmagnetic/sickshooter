ig.module (
	'game.entities.enemy'
)
.requires (
	'impact.game',
	'impact.entity',
	'game.entities.player'
)
.defines(function() {

EntityEnemy = ig.Entity.extend({
	
	size: {x:32, y:32},

	//Offsetting the hitbox... not sure if this is doing it properly
	offset: {x: 2, y: -4},
	type: ig.Entity.TYPE.B, // Player friendly group
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,
	animSheet: new ig.AnimationSheet( 'media/ships/8.png', 32, 32),
	timer: new ig.Timer(),
	player: {},
	dontMove: false,
	
	// Entity specific shit

	health: 50,
	facing: 'down',

	init: function( x, y, settings) {
		this.parent( x, y, settings);

		this.addAnim('idle', 0.1, [0]);
		this.addAnim('down', 0.1, [0,1,2,3]);		
		this.addAnim('left', 0.1, [4,5,6,7]);						
		this.addAnim('right', 0.1, [8,9,10,11]);	
		this.addAnim('up', 0.1, [12,13,14,15]);

		this.player = ig.game.getEntitiesByType( EntityPlayer )[0];
	
	},

	update: function() {

		//If above player
		if (this.pos.y < this.player.pos.y) {
			// 	this.currentAnim = this.anims.up;
			// 	this.facing = 'up';
			switch (this.pos.x < this.player.pos.x) {
				case true:
					this.pos.y += 1;	
					this.pos.x += 1;	
					break;
				case false:
					this.pos.y += 1;
					this.pos.x -= 1;
					break;
			}
		} else {
			this.flip = true;
			//If under player
			// 	this.currentAnim = this.anims.down;
			// 	this.facing = 'down';
			switch (this.pos.x < this.player.pos.x) {
				case true:
					this.pos.y -= 1;	
					this.pos.x += 1;	
					break;
				case false:
					this.pos.y -= 1;
					this.pos.x -= 1;
					break;
			}
		}

		// // shoot
		// if( ig.input.pressed('shoot') ) {

		// 	/*
		// 		Here I'm spawning the claw. 

		// 		Notice how the last parameter is an array and you can pass it any shit you like which
		// 		you can then access from inside the claw entity.
		// 	*/
			
		// 	ig.game.spawnEntity( EntityClaw, this.pos.x, this.pos.y,  {flip:this.flip, facing:this.facing} );
		// }

		var pp = this.pos.x - ig.game.screen.x;

       if( pp > ig.system.width ){
            
            console.log("knocked out of range.")
        }

		this.parent();
		console.log(this.dontMove);
	},

	handleMovementTrace: function( res ) {
		this.parent( res );
	},

	check: function( other ) {
		this.dontMove = true;
	}	

});

});