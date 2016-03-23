//定义两个颜色数组
var heroColor = new Array("#FEF26E","#BA9658");
var enemyColor = new Array("#00FEFE","#00A2B5");

//定义一个Tank类
//x表示横坐标，Y表示纵坐标，direct表示方向(0表示上，1表示右，2表示下，3表示左)
function Tank(x,y,direct,color){
	this.x = x;
	this.y = y;
	this.speed = 1;
	this.isLive = true;
	this.direct = direct;
	this.color = color;
	//上移
	this.moveUp = function(){
		this.y -= this.speed;

		this.direct = 0;
		}
	//右移
	this.moveRight = function(){
		this.x += this.speed;
		this.direct = 1;
		}
	//下移
	this.moveBottom = function(){
		this.y += this.speed;
		this.direct = 2;
		}
	//左移
	this.moveLeft = function(){
		this.x -= this.speed;
		this.direct = 3;
		}
}
//定义一个Hero类(自己的坦克)
function Hero(x,y,direct,color){
		this.hero = Tank; 
	    this.hero(x,y,direct,color);
	    this.speed = 3;
	    //增加一个射击敌人的函数
	    this.shotEnemy=function(){
	    	 //创建子弹,子弹的位置和方向都与hero有关
	    	 switch(this.direct){
	    	 	case 0:
	    	 	heroBullet = new Bullet(this.x+9,this.y,this.direct,2);
	    	 	break;
	    	 	case 1:
	    	 	heroBullet = new Bullet(this.x+30,this.y+9,this.direct,2);
	    	 	break;
	    	 	case 2:
	    	 	heroBullet = new Bullet(this.x+9,this.y+30,this.direct,2);
	    	 	break;
	    	 	case 3:
	    	 	heroBullet = new Bullet(this.x,this.y+9,this.direct,2);
	    	 	break;
	    	 }
	    	 //把子弹对象放入数组中
	    	 heroBullets.push(heroBullet);
	    	 //调用子弹，每个子弹共享一个定时器
	    	 var timer = window.setInterval("heroBullets["+(heroBullets.length-1)+"].run()",50);
	    	 //把timer赋值给子弹
	    	 heroBullets[heroBullets.length-1].timer=timer;
	    }
}

//定义一个EnemyTank类
function EnemyTank(x,y,direct,color){
	this.tank = Tank;
	this.tank(x,y,direct,color);
	this.color = color;
	this.isLive = true;
	this.count = 0;
	this.bulletIsLive = true;
	this.run = function run(){
		switch(this.direct){
			case 0:
			if(this.y>0){
				this.y -= this.speed;
			}
			break;
			case 1:
			if(this.x+30<400){
				this.x += this.speed;
			}
			break;
			case 2:
			if(this.y+30<300){
				this.y += this.speed;
			}
			break;
			case 3:
			if(this.x>0){
				this.x -= this.speed;
			}
			break;
		}
		//改变方向，走30次，再改变方向
		if(this.count >= 30){
			this.direct = Math.round(Math.random()*3);//随机生成0,1,2,3
			this.count = 0;
		}
		this.count++;
		//判断子弹是否已经死亡且坦克还活着，则增加新的一颗子弹
		if(this.bulletIsLive==false && this.isLive){
			switch(this.direct){
			case 0:
			etBullet = new Bullet(this.x+9,this.y,this.direct,2,"enemy",this);
			break;
			case 1:
			etBullet = new Bullet(this.x+30,this.y+9,this.direct,2,"enemy",this);
			break;
			case 2:
			etBullet = new Bullet(this.x+9,this.y+30,this.direct,2,"enemy",this);
			break;
			case 3: 
			etBullet = new Bullet(this.x,this.y+9,this.direct,2,"enemy",this);
			break;
				}
				//把敌人的子弹添加到敌人的子弹数组
				enemyBullets.push(etBullet);
				//启动新子弹run
				var mytimer=window.setInterval("enemyBullets["+(enemyBullets.length-1)+"].run()",50);
				enemyBullets[enemyBullets.length-1].timer=mytimer;
				this.bulletIsLive=true;
			}
	}
}

//把绘制坦克封装成一个函数
//画出坦克(以坦克的左上角为参照点，然后画出坦克的其他部分，这样的好处是当左上角的坐标改变时，坦克就整体改动)
function drawTank(tank){
	if(tank.isLive){
		switch(tank.direct){
        	case 0:
        	case 2:
				//设置颜色
				cxt.fillStyle=tank.color[0];
				//画出左边的矩形
				cxt.fillRect(tank.x,tank.y,5,30);
				//右边
				cxt.fillRect(tank.x+15,tank.y,5,30);
				//中间
				cxt.fillRect(tank.x+6,tank.y+5,8,20);
				//画出坦克的盖子
				cxt.fillStyle=tank.color[1];
				cxt.arc(tank.x+10,tank.y+15,4,0,2*Math.PI,true);
				cxt.fill();
				//画出炮筒（直线）
				cxt.strokeStyle = tank.color[1];
				cxt.lineWidth = 2;
				cxt.beginPath();
				cxt.moveTo(tank.x+10,tank.y+15);
				if(tank.direct == 0){
					cxt.lineTo(tank.x+10,tank.y);
				}else if(tank.direct==2){
					cxt.lineTo(tank.x+10,tank.y+30);
				}
				cxt.closePath();
				cxt.stroke();
			break;
			case 1:
			case 3:
				cxt.fillStyle = tank.color[0];
				cxt.fillRect(tank.x,tank.y,30,5);
				cxt.fillRect(tank.x,tank.y+15,30,5);
				cxt.fillRect(tank.x+5,tank.y+6,20,8);
				//画出坦克的盖子
				cxt.fillStyle = tank.color[1];
				cxt.arc(tank.x+15,tank.y+10,4,0,2*Math.PI,true);
				cxt.fill();
				//画出炮筒（直线）
				cxt.strokeStyle = tank.color[1];
				cxt.lineWidth = 2;
				cxt.beginPath();
				cxt.moveTo(tank.x+15,tank.y+10);
				if(tank.direct == 1){
					cxt.lineTo(tank.x+30,tank.y+10);
				}else if(tank.direct==3){
					cxt.lineTo(tank.x,tank.y+10);
				}
				cxt.closePath();
				cxt.stroke();
			break;
    	}	
	} 
}

//子弹类
//type表示子弹是自己的还是敌人的
//tank表示对象，说明这颗子弹属于哪个坦克
function Bullet(x,y,direct,speed,type,tank){
	this.x = x;
	this.y = y;
	this.direct = direct;
	this.speed = speed;
	this.isLive = true;
	this.timer = null;
	this.type = type;
	this.tank = tank;
	this.run = function run(){
		//在改变子弹坐标时，先判断子弹的坐标是否已到达边界或碰到对方坦克
		if(this.x <= 0 || this.x >= 400 || this.y<=0 || this.y >= 300 || this.isLive==false){
			//子弹要停止
			window.clearInterval(this.timer);
			//子弹死亡
			this.isLive = false;
			//如果子弹是敌人的
			if(this.type == "enemy"){
				this.tank.bulletIsLive = false;
			}
		}else{
		switch(this.direct){
			case 0:
			      this.y -= this.speed;
				break;
			case 1:
				this.x += this.speed;
				break;
			case 2:
				this.y += this.speed;
				break;
			case 3:
			    this.x -= this.speed;
				break;
			}
		}
	}
}

//画出自己的子弹
function drawHeroBullet(){
	for(var i = 0;i<heroBullets.length;i++){
		var heroBullet = heroBullets[i];
		if(heroBullet != null && heroBullet.isLive){
			cxt.fillStyle="#FEF26E";
			cxt.fillRect(heroBullet.x,heroBullet.y,2,2);
   		}
	}
}

//画出敌人的子弹
function drawEnemyBullet(){
	for(var i = 0; i< enemyBullets.length;i++){
		var etBullet=enemyBullets[i];
		if(etBullet.isLive){
			cxt.fillStyle = "#00FEFE";
			cxt.fillRect(etBullet.x,etBullet.y,2,2);
		}
	}
}

//判断我的子弹是否击中了敌人坦克
function isHitEnemyTank(){
	//取出每颗子弹
	for(var i=0;i<heroBullets.length;i++){
		var heroBullet = heroBullets[i];
		if(heroBullet.isLive && hero.isLive){   //子弹是活的时候才去判断
			//让子弹去和每个敌人的坦克判断
			for(var j = 0; j < enemyTanks.length;j++){
				var enemyTank = enemyTanks[j];
				if(enemyTank.isLive){
					switch(enemyTank.direct){
						case 0:
						case 2:
						if(heroBullet.x >= enemyTank.x && heroBullet.x <= enemyTank.x+20 && heroBullet.y >= enemyTank.y && heroBullet.y <= enemyTank.y+30){
							//把坦克isLive设为false,表示死亡
							enemyTank.isLive = false;
							//子弹也死亡
							heroBullet.isLive = false;
							//创建一颗炸弹
							var bomb = new Bomb(enemyTank.x,enemyTank.y);
							//然后把该炸弹放入到bombs数组中
							bombs.push(bomb);
						}
						break;
						case 1:
						case 3:
						if(heroBullet.x >= enemyTank.x && heroBullet.x <= enemyTank.x+30 && heroBullet.y >= enemyTank.y && heroBullet.y <= enemyTank.y+20){
							//把坦克isLive设为false,表示死亡
							enemyTank.isLive = false;
							//子弹也死亡
							heroBullet.isLive = false;	
							var bomb = new Bomb(enemyTank.x,enemyTank.y);
							//然后把该炸弹放入到bombs数组中
							bombs.push(bomb);
						}
						break;
					}
				}
			}
		}
	}
}

//判断敌人的子弹是否击中自己的坦克
function isHitHeroTank(){
	for(var i=0;i<enemyBullets.length;i++){
		var enemyBullet = enemyBullets[i];
		if(enemyBullets[i].isLive){
			switch(hero.direct){
				case 0:
				case 2:
				if(enemyBullets[i].x >= hero.x && enemyBullets[i].x <= hero.x+20 && enemyBullets[i].y >= hero.y && enemyBullets[i].y <= hero.y+30){
					hero.isLive = false;
					enemyBullets[i].isLive = false;
					var bomb = new Bomb(hero.x,hero.y);
					bombs.push(bomb);
				}
				break;
				case 1:
				case 3:
				if(enemyBullets[i].x >= hero.x && enemyBullets[i].x <= hero.x+30 && enemyBullets[i].y >= hero.y && enemyBullets[i].y <= hero.y+20){
					hero.isLive = false;
					enemyBullets[i].isLive = false;
					var bomb = new Bomb(hero.x,hero.y);
					bombs.push(bomb);
				}
				break;
			}
		}
	}
}

//定义一个炸弹类（用于显示爆炸效果）
function Bomb(x,y){
	this.x = x;
	this.y = y;
	this.isLive = true;
	//炸弹有一个生命值（炸弹由大到小显示）
	this.blood = 9;
	//减生命值
	this.bloodDown = function(){
		if(this.blood > 0){
			this.blood--;
		}else{
			//说明炸弹死亡（消失）
			this.isLive = false;
		}
	}
}

//画出炸弹
function drawBomb(){
	for(var i=0;i<bombs.length;i++){
		var bomb=bombs[i];
		if(bomb.isLive){
			//根据当前炸弹的生命值，来画出不同的炸弹图片
			if(bomb.blood>6){  //显示最大炸弹图
				var img1=new Image();
				img1.src="images/bomb_1.gif";
				var x=bomb.x;
				var y=bomb.y;
				img1.onload=function(){
					cxt.drawImage(img1,x,y,30,30);
				}
			}else if(bomb.blood>3){
				var img2=new Image();
				img2.src="images/bomb_2.gif";
				var x=bomb.x;
				var y=bomb.y;
				img2.onload=function(){
					cxt.drawImage(img2,x,y,30,30);
				}
			}else {
				var img3=new Image();
				img3.src="images/bomb_3.gif";
				var x=bomb.x;
				var y=bomb.y;
				img3.onload=function(){
					cxt.drawImage(img3,x,y,30,30);
				}
			}
			//减血
			bomb.bloodDown();
			if(bomb.blood<=0){
				//把这个炸弹从数组中去掉
				bombs.splice(i,1);
			}
		}
	}
}

