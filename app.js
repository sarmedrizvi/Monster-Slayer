new Vue({
	el: '#app',
	data: {
		playerHealth: 100,
		monsterHealth: 100,
		gameIsRunning: false,
		turns: [],
	},
	methods: {
		startGame: function () {
			this.gameIsRunning = true;
			this.monsterHealth = 100;
			this.playerHealth = 100;
			this.turns = [];
		},
		attack: function () {
			const damage = this.calculateDamage(10, 3);
			this.monsterHealth -= damage
			this.turns = [{ isplayer: true, text: `Player hits Monster for ${damage}` }, ...this.turns]
			if (this.checkWon()) {
				return;
			}
			this.monsterAttack();
			this.checkWon();
		},
		specialAttack: function () {
			const damage = this.calculateDamage(20, 10);
			this.monsterHealth -= damage;
			this.turns = [{ isplayer: true, text: `Player hits Monster hard for ${damage}` }, ...this.turns]

			if (this.checkWon()) {
				return;
			}
			this.monsterAttack();
			this.checkWon();

		},
		monsterAttack: function () {
			const damage = this.calculateDamage(12, 5)
			this.playerHealth -= damage
			this.turns = [{ isplayer: false, text: `Monster hits Player for ${damage}` }, ...this.turns]
			console.log(this.turns)
		},
		heal: function () {
			const inc = this.calculateDamage(15, 8);
			let heal = 0;
			if (this.playerHealth + inc < 100) {
				this.playerHealth += inc;
				heal = inc;
			}
			else {
				heal = ((this.playerHealth + inc) - 100) - inc
				this.playerHealth = 100;
			}
			this.turns = [{ isplayer: true, text: `Player heals for ${heal}` }, ...this.turns]
			this.monsterAttack()
		},
		giveUp: function () {
			this.gameIsRunning = false;
		},
		calculateDamage: function (max, min) {
			return Math.max(Math.floor(Math.random() * max) + 1, min)
		},
		checkWon: function () {
			if (this.monsterHealth <= 0) {
				if (confirm('You won!! Do you want to continue ?')) {
					this.startGame()
				}
				else {
					this.gameIsRunning = false;
				}
				return true;
			}
			else if (this.playerHealth <= 0) {
				if (confirm('You lost!! Do you want to continue ?')) {
					this.startGame()
				}
				else {
					this.gameIsRunning = false;
				}
				return true;
			}

			return false;
		}
	}
})