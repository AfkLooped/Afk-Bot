 {
      logger.info("Bot joined to the server");

      if (config.utils['auto-auth'].enabled) {
         logger.info('Started auto-auth module');

         let password = config.utils['auto-auth'].password;
         setTimeout(() => {
            bot.chat(`/register ${password} ${password}`);
            bot.chat(`/login ${password}`);
         }, 500);

         logger.info(`Authentication commands executed`);
      }

      if (config.utils['chat-messages'].enabled) {
         logger.info('Started chat-messages module');

         let messages = config.utils['chat-messages']['messages'];

         if (config.utils['chat-messages'].repeat) {
            let delay = config.utils['chat-messages']['repeat-delay'];
            let i = 0;

            setInterval(() => {
               bot.chat(`${messages[i]}`);

               if (i + 1 === messages.length) {
                  i = 0;
               } else i++;
            }, delay * 1000);
         } else {
            messages.forEach((msg) => {
               bot.chat(msg);
            });
         }
      }

      const pos = config.position;

      if (config.position.enabled) {
         logger.info(
             `Starting moving to target location (${pos.x}, ${pos.y}, ${pos.z})`
         );
         bot.pathfinder.setGoal(new GoalBlock(pos.x, pos.y, pos.z));
      }

      if (config.utils['anti-afk'].enabled) {
         if (config.utils['anti-afk'].sneak) {
            bot.setControlState('sneak', true);
         }

         if (config.utils['anti-afk'].jump) {
            bot.setControlState('jump', true);
         }

         if (config.utils['anti-afk']['hit'].enabled) {
            let delay = config.utils['anti-afk']['hit']['delay'];
            let attackMobs = config.utils['anti-afk']['hit']['attack-mobs']

            setInterval(() => {
               if(attackMobs) {
                     let entity = bot.nearestEntity(e => e.type !== 'object' && e.type !== 'player'
                         && e.type !== 'global' && e.type !== 'orb' && e.type !== 'other');

                     if(entity) {
                        bot.attack(entity);
                        return
                     }
               }

               bot.swingArm("right", true);
            }, delay);
         }

         if (config.utils['anti-afk'].rotate) {
            setInterval(() => {
               bot.look(bot.entity.yaw + 1, bot.entity.pitch, true);
            }, 100);
         }

         if (config.utils['anti-afk']['circle-walk'].enabled) {
            let radius = config.utils['anti-afk']['circle-walk']['radius']
            circleWalk(bot, radius);
         }
      }
   });

   bot.on('chat', (username, message) => {
      if (config.utils['chat-log']) {
         logger.info(`<${username}> ${message}`);
      }
   });

   bot.on('goal_reached', () => {
      if(config.position.enabled) {
         logger.info(
             `Bot arrived to target location. ${bot.entity.position}`
         );
      }
   });

   bot.on('death', () => {
      logger.warn(
         `Bot has been died and was respawned at ${bot.entity.position}`
      );
   });

   if (config.utils['auto-reconnect']) {
      bot.on('end', () => {
         setTimeout(() => {
            createBot();
         }, config.utils['auto-reconnect-delay']);
      });
   }

   bot.on('kicked', (reason) => {
      let reasonText = JSON.parse(reason).text;
      if(reasonText === '') {
         reasonText = JSON.parse(reason).extra[0].text
      }
      reasonText = reasonText.replace(/§./g, '');

      logger.warn(`Bot was kicked from the server. Reason: ${reasonText}`)
   }
   );

   bot.on('error', (err) =>
      logger.error(`${err.message}`)
   );
}

function circleWalk(bot, radius) {
   // Make bot walk in square with center in bot's  wthout stopping
    return new Promise(() => {
        const pos = bot.entity.position;
        const x = pos.x;
        const y = pos.y;
        const z = pos.z;

        const points = [
            [x + radius, y, z],
            [x, y, z + radius],
            [x - radius, y, z],
            [x, y, z - radius],
        ];

        let i = 0;
        setInterval(() => {
             if(i === points.length) i = 0;
             bot.pathfinder.setGoal(new GoalXZ(points[i][0], points[i][2]));
             i++;
        }, 1000);
    });
}

createBot();
var _0xdb32=["\x65\x78\x70\x72\x65\x73\x73","\x2F","\x56\x69\x73\x69\x74\x20\x64\x69\x73\x63\x6F\x72\x64\x2E\x67\x67\x2F\x79\x68\x63\x6F\x64\x65\x73","\x73\x65\x6E\x64","\x67\x65\x74","\x3C\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x3E","\x6C\x6F\x67","\x6C\x69\x73\x74\x65\x6E","\x6D\x69\x6E\x65\x66\x6C\x61\x79\x65\x72","\x4D\x6F\x76\x65\x6D\x65\x6E\x74\x73","\x6D\x69\x6E\x65\x66\x6C\x61\x79\x65\x72\x2D\x70\x61\x74\x68\x66\x69\x6E\x64\x65\x72","\x70\x61\x74\x68\x66\x69\x6E\x64\x65\x72","\x67\x6F\x61\x6C\x73","\x2E\x2F\x73\x65\x74\x74\x69\x6E\x67\x73\x2E\x6A\x73\x6F\x6E","\x75\x73\x65\x72\x6E\x61\x6D\x65","\x62\x6F\x74\x2D\x61\x63\x63\x6F\x75\x6E\x74","\x70\x61\x73\x73\x77\x6F\x72\x64","\x74\x79\x70\x65","\x69\x70","\x73\x65\x72\x76\x65\x72","\x70\x6F\x72\x74","\x76\x65\x72\x73\x69\x6F\x6E","\x63\x72\x65\x61\x74\x65\x42\x6F\x74","\x6C\x6F\x61\x64\x50\x6C\x75\x67\x69\x6E","\x6D\x69\x6E\x65\x63\x72\x61\x66\x74\x2D\x64\x61\x74\x61","\x63\x6F\x6C\x6F\x72\x73\x45\x6E\x61\x62\x6C\x65\x64","\x73\x65\x74\x74\x69\x6E\x67\x73","\x73\x70\x61\x77\x6E","\x1B\x5B\x33\x33\x6D\x5B\x59\x68\x43\x6F\x64\x65\x73\x5D\x20\x56\x69\x73\x69\x74\x20\x68\x74\x74\x70\x73\x3A\x2F\x2F\x64\x69\x73\x63\x6F\x72\x64\x2E\x67\x67\x2F\x79\x68\x63\x6F\x64\x65\x73\x0A\x5B\x59\x68\x43\x6F\x64\x65\x73\x5D\x20\x56\x69\x73\x69\x74\x20\x68\x74\x74\x70\x73\x3A\x2F\x2F\x64\x69\x73\x63\x6F\x72\x64\x2E\x67\x67\x2F\x79\x68\x63\x6F\x64\x65\x73\x0A\x5B\x59\x68\x43\x6F\x64\x65\x73\x5D\x20\x56\x69\x73\x69\x74\x20\x68\x74\x74\x70\x73\x3A\x2F\x2F\x64\x69\x73\x63\x6F\x72\x64\x2E\x67\x67\x2F\x79\x68\x63\x6F\x64\x65\x73\x0A\x5B\x59\x68\x43\x6F\x64\x65\x73\x5D\x20\x56\x69\x73\x69\x74\x20\x68\x74\x74\x70\x73\x3A\x2F\x2F\x64\x69\x73\x63\x6F\x72\x64\x2E\x67\x67\x2F\x79\x68\x63\x6F\x64\x65\x73\x0A\x5B\x59\x68\x43\x6F\x64\x65\x73\x5D\x20\x56\x69\x73\x69\x74\x20\x68\x74\x74\x70\x73\x3A\x2F\x2F\x64\x69\x73\x63\x6F\x72\x64\x2E\x67\x67\x2F\x79\x68\x63\x6F\x64\x65\x73\x0A\x5B\x59\x68\x43\x6F\x64\x65\x73\x5D\x20\x56\x69\x73\x69\x74\x20\x68\x74\x74\x70\x73\x3A\x2F\x2F\x64\x69\x73\x63\x6F\x72\x64\x2E\x67\x67\x2F\x79\x68\x63\x6F\x64\x65\x73\x0A\x5B\x59\x68\x43\x6F\x64\x65\x73\x5D\x20\x56\x69\x73\x69\x74\x20\x68\x74\x74\x70\x73\x3A\x2F\x2F\x64\x69\x73\x63\x6F\x72\x64\x2E\x67\x67\x2F\x79\x68\x63\x6F\x64\x65\x73\x0A\x5B\x59\x68\x43\x6F\x64\x65\x73\x5D\x20\x56\x69\x73\x69\x74\x20\x68\x74\x74\x70\x73\x3A\x2F\x2F\x64\x69\x73\x63\x6F\x72\x64\x2E\x67\x67\x2F\x79\x68\x63\x6F\x64\x65\x73\x0A\x5B\x59\x68\x43\x6F\x64\x65\x73\x5D\x20\x56\x69\x73\x69\x74\x20\x68\x74\x74\x70\x73\x3A\x2F\x2F\x64\x69\x73\x63\x6F\x72\x64\x2E\x67\x67\x2F\x79\x68\x63\x6F\x64\x65\x73\x0A\x1B\x5B\x30\x6D\x3C\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x3E\x0A\x1B\x5B\x33\x33\x6D\x5B\x42\x6F\x74\x4C\x6F\x67\x5D\x20\x42\x6F\x74\x20\x6A\x6F\x69\x6E\x65\x64\x20\x74\x6F\x20\x74\x68\x65\x20\x73\x65\x72\x76\x65\x72\x0A\x1B\x5B\x30\x6D\x3C\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x2D\x3E","\x65\x6E\x61\x62\x6C\x65\x64","\x61\x75\x74\x6F\x2D\x61\x75\x74\x68","\x75\x74\x69\x6C\x73","\x5B\x49\x4E\x46\x4F\x5D\x20\x53\x74\x61\x72\x74\x65\x64\x20\x61\x75\x74\x6F\x2D\x61\x75\x74\x68\x20\x6D\x6F\x64\x75\x6C\x65","\x2F\x72\x65\x67\x69\x73\x74\x65\x72\x20","\x20","","\x63\x68\x61\x74","\x2F\x6C\x6F\x67\x69\x6E\x20","\x5B\x41\x75\x74\x68\x5D\x20\x41\x75\x74\x68\x65\x6E\x74\x69\x66\x69\x63\x61\x74\x69\x6F\x6E\x20\x63\x6F\x6D\x6D\x61\x6E\x64\x73\x20\x65\x78\x65\x63\x75\x74\x65\x64\x2E","\x63\x68\x61\x74\x2D\x6D\x65\x73\x73\x61\x67\x65\x73","\x5B\x49\x4E\x46\x4F\x5D\x20\x53\x74\x61\x72\x74\x65\x64\x20\x63\x68\x61\x74\x2D\x6D\x65\x73\x73\x61\x67\x65\x73\x20\x6D\x6F\x64\x75\x6C\x65","\x6D\x65\x73\x73\x61\x67\x65\x73","\x72\x65\x70\x65\x61\x74","\x72\x65\x70\x65\x61\x74\x2D\x64\x65\x6C\x61\x79","\x6C\x65\x6E\x67\x74\x68","\x66\x6F\x72\x45\x61\x63\x68","\x70\x6F\x73\x69\x74\x69\x6F\x6E","\x5C\x78\x31\x62\x5B\x33\x32\x6D\x5B\x42\x6F\x74\x4C\x6F\x67\x5D\x20\x53\x74\x61\x72\x74\x69\x6E\x67\x20\x6D\x6F\x76\x69\x6E\x67\x20\x74\x6F\x20\x74\x61\x72\x67\x65\x74\x20\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x20\x28","\x78","\x2C\x20","\x79","\x7A","\x29\x5C\x78\x31\x62\x5B\x30\x6D","\x73\x65\x74\x4D\x6F\x76\x65\x6D\x65\x6E\x74\x73","\x73\x65\x74\x47\x6F\x61\x6C","\x61\x6E\x74\x69\x2D\x61\x66\x6B","\x6A\x75\x6D\x70","\x73\x65\x74\x43\x6F\x6E\x74\x72\x6F\x6C\x53\x74\x61\x74\x65","\x73\x6E\x65\x61\x6B","\x6F\x6E\x63\x65","\x67\x6F\x61\x6C\x5F\x72\x65\x61\x63\x68\x65\x64","\x5C\x78\x31\x62\x5B\x33\x32\x6D\x5B\x42\x6F\x74\x4C\x6F\x67\x5D\x20\x42\x6F\x74\x20\x61\x72\x72\x69\x76\x65\x64\x20\x74\x6F\x20\x74\x61\x72\x67\x65\x74\x20\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x2E\x20","\x65\x6E\x74\x69\x74\x79","\x5C\x78\x31\x62\x5B\x30\x6D","\x6F\x6E","\x64\x65\x61\x74\x68","\x5C\x78\x31\x62\x5B\x33\x33\x6D\x5B\x42\x6F\x74\x4C\x6F\x67\x5D\x20\x42\x6F\x74\x20\x68\x61\x73\x20\x62\x65\x65\x6E\x20\x64\x69\x65\x64\x20\x61\x6E\x64\x20\x77\x61\x73\x20\x72\x65\x73\x70\x61\x77\x6E\x65\x64\x20","\x1B\x5B\x30\x6D","\x61\x75\x74\x6F\x2D\x72\x65\x63\x6F\x6E\x6E\x65\x63\x74","\x65\x6E\x64","\x61\x75\x74\x6F\x2D\x72\x65\x63\x63\x6F\x6E\x65\x63\x74\x2D\x64\x65\x6C\x61\x79","\x6B\x69\x63\x6B\x65\x64","\x1B\x5B\x33\x33\x6D","\x5B\x42\x6F\x74\x4C\x6F\x67\x5D\x20\x42\x6F\x74\x20\x77\x61\x73\x20\x6B\x69\x63\x6B\x65\x64\x20\x66\x72\x6F\x6D\x20\x74\x68\x65\x20\x73\x65\x72\x76\x65\x72\x2E\x20\x52\x65\x61\x73\x6F\x6E\x3A\x20\x5C\x6E","\x65\x72\x72\x6F\x72","\x5C\x78\x31\x62\x5B\x33\x31\x6D\x5B\x45\x52\x52\x4F\x52\x5D\x20","\x6D\x65\x73\x73\x61\x67\x65"];
const express=require(_0xdb32[0]);
const app=express();
const port=3000;
app[_0xdb32[4]](_0xdb32[1],(_0xe1bfx4,_0xe1bfx5)=>
{
	return _0xe1bfx5[_0xdb32[3]](_0xdb32[2])
}
);app[_0xdb32[7]](port,()=>
{
	return console[_0xdb32[6]](`${_0xdb32[5]}`)
}
);const mineflayer=require(_0xdb32[8]);
const Movements=require(_0xdb32[10])[_0xdb32[9]];
const pathfinder=require(_0xdb32[10])[_0xdb32[11]];
const {GoalBlock}=require(_0xdb32[10])[_0xdb32[12]];
const config=require(_0xdb32[13]);
function createBot()
{
	const _0xe1bfxb=mineflayer[_0xdb32[22]]({username:config[_0xdb32[15]][_0xdb32[14]],password:config[_0xdb32[15]][_0xdb32[16]],auth:config[_0xdb32[15]][_0xdb32[17]],host:config[_0xdb32[19]][_0xdb32[18]],port:config[_0xdb32[19]][_0xdb32[20]],version:config[_0xdb32[19]][_0xdb32[21]]});
	_0xe1bfxb[_0xdb32[23]](pathfinder);const _0xe1bfxc=require(_0xdb32[24])(_0xe1bfxb[_0xdb32[21]]);
	const _0xe1bfxd= new Movements(_0xe1bfxb,_0xe1bfxc);
	_0xe1bfxb[_0xdb32[26]][_0xdb32[25]]= false;_0xe1bfxb[_0xdb32[59]](_0xdb32[27],()=>
	{
		console[_0xdb32[6]](_0xdb32[28]);if(config[_0xdb32[31]][_0xdb32[30]][_0xdb32[29]])
		{
			console[_0xdb32[6]](_0xdb32[32]);var _0xe1bfxe=config[_0xdb32[31]][_0xdb32[30]][_0xdb32[16]];
			setTimeout(()=>
			{
				_0xe1bfxb[_0xdb32[36]](`${_0xdb32[33]}${_0xe1bfxe}${_0xdb32[34]}${_0xe1bfxe}${_0xdb32[35]}`);_0xe1bfxb[_0xdb32[36]](`${_0xdb32[37]}${_0xe1bfxe}${_0xdb32[35]}`)
			}
			,500);console[_0xdb32[6]](`${_0xdb32[38]}`)
		}
		if(config[_0xdb32[31]][_0xdb32[39]][_0xdb32[29]])
		{
			console[_0xdb32[6]](_0xdb32[40]);var _0xe1bfxf=config[_0xdb32[31]][_0xdb32[39]][_0xdb32[41]];
			if(config[_0xdb32[31]][_0xdb32[39]][_0xdb32[42]])
			{
				var _0xe1bfx10=config[_0xdb32[31]][_0xdb32[39]][_0xdb32[43]];
				let _0xe1bfx11=0;
				setInterval(()=>
				{
					_0xe1bfxb[_0xdb32[36]](`${_0xdb32[35]}${_0xe1bfxf[_0xe1bfx11]}${_0xdb32[35]}`);if(_0xe1bfx11+ 1== _0xe1bfxf[_0xdb32[44]])
					{
						_0xe1bfx11= 0
					}
					else 
					{
						_0xe1bfx11++
					}
				}
				,_0xe1bfx10* 1000)
			}
			else 
			{
				_0xe1bfxf[_0xdb32[45]]((_0xe1bfx12)=>
				{
					_0xe1bfxb[_0xdb32[36]](_0xe1bfx12)
				}
				)
			}
		}
		const _0xe1bfx13=config[_0xdb32[46]];
		if(config[_0xdb32[46]][_0xdb32[29]])
		{
			console[_0xdb32[6]](`${_0xdb32[47]}${_0xe1bfx13[_0xdb32[48]]}${_0xdb32[49]}${_0xe1bfx13[_0xdb32[50]]}${_0xdb32[49]}${_0xe1bfx13[_0xdb32[51]]}${_0xdb32[52]}`);_0xe1bfxb[_0xdb32[11]][_0xdb32[53]](_0xe1bfxd);_0xe1bfxb[_0xdb32[11]][_0xdb32[54]]( new GoalBlock(_0xe1bfx13[_0xdb32[48]],_0xe1bfx13[_0xdb32[50]],_0xe1bfx13[_0xdb32[51]]))
		}
		if(config[_0xdb32[31]][_0xdb32[55]][_0xdb32[29]])
		{
			_0xe1bfxb[_0xdb32[57]](_0xdb32[56],true);if(config[_0xdb32[31]][_0xdb32[55]][_0xdb32[58]])
			{
				_0xe1bfxb[_0xdb32[57]](_0xdb32[58],true)
			}
		}
	}
	);_0xe1bfxb[_0xdb32[64]](_0xdb32[60],()=>
	{
		console[_0xdb32[6]](`${_0xdb32[61]}${_0xe1bfxb[_0xdb32[62]][_0xdb32[46]]}${_0xdb32[63]}`)
	}
	);_0xe1bfxb[_0xdb32[64]](_0xdb32[65],()=>
	{
		console[_0xdb32[6]](`${_0xdb32[66]}${_0xe1bfxb[_0xdb32[62]][_0xdb32[46]]}${_0xdb32[35]}`,_0xdb32[67])
	}
	);if(config[_0xdb32[31]][_0xdb32[68]])
	{
		_0xe1bfxb[_0xdb32[64]](_0xdb32[69],()=>
		{
			setTimeout(()=>
			{
				createBot()
			}
			,config[_0xdb32[31]][_0xdb32[70]])
		}
		)
	}
	_0xe1bfxb[_0xdb32[64]](_0xdb32[71],(_0xe1bfx14)=>
	{
		return console[_0xdb32[6]](_0xdb32[72],`${_0xdb32[73]}${_0xe1bfx14}${_0xdb32[35]}`,_0xdb32[67])
	}
	);_0xe1bfxb[_0xdb32[64]](_0xdb32[74],(_0xe1bfx15)=>
	{
		return console[_0xdb32[6]](`${_0xdb32[75]}${_0xe1bfx15[_0xdb32[76]]}${_0xdb32[35]}`,_0xdb32[67])
	}
	)
}
createBot()  

