/* eslint-disable quotes */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray() {
  return [
    {
      uid: 1,
      username: 'usera',
      fullname: 'Aaron Aaronson',
      password: '$2a$12$IpHCvJOhVSyuK9I020hekOsuPi95/ReFe3MGUlzHUMIHP.pS4NQvy',
      nickname: 'AA'
    },
    {
      uid: 2,
      username: 'userb',
      fullname: 'Betty Baxter',
      password: '$2a$12$2WHnQO6/Tt2H4pji.KR7zu3XpD4oBoUo.lepQiK0vuFEiLRilL2Zu',
      nickname: 'BB'
    },
    {
      uid: 3,
      username: 'userc',
      fullname: 'Charlie Chaplan',
      password: '$2a$12$t/bGanhT0dU2xBg5GM.7dOWGi/r0hrjV1pBCbkU6rpUpajPEcnE.K',
      nickname: 'CC'
    },
    {
      uid: 4,
      username: 'userd',
      fullname: 'Deborah Dirk',
      password: '$2a$12$YOkClsAiStXU6VG.H6kEi.JoByEo9hp47ml0wDAdbnSAksPsz9WIa',
      nickname: 'DD'
    },
    {
      uid: 5,
      username: 'usere',
      fullname: 'Eustace Evergreen',
      password: '$2a$12$CK4Z.24buYLktMgwDkZE2.Gdva.hg/5B3r8lxTJ1CcwQNcvQBwOCe',
      nickname: 'EE'
    }
  ];
}

function makeBestiaryArray() {
  return [
    {
      bid: 1,
      monstername: 'Aarakocra',
      type: 'Medium humanoid, neutral good',
      ac: '12',
      maxhp: '3d8',
      speed: 20,
      burrowspeed: null,
      climbspeed: null,
      flyspeed: 50,
      swimspeed: null,
      str: 10,
      strmod: 0,
      dex: 14,
      dexmod: 2,
      con: 10,
      conmod: 0,
      int: 11,
      intmod: 0,
      wis: 12,
      wismod: 1,
      cha: 11,
      chamod: 0,
      savingthrows: null,
      skills: 'Perception +5',
      vulnerabilities: null,
      resistances: null,
      immunities: null,
      senses: 'passive Perception 15',
      languages: 'Auran',
      cr: 0.25,
      xp: 50,
      extras: [['Dive Attack', 'If the aarakocra if flying and dives at least 30 ft straight toward a target and then hits it with a melee weapon attack, the attack deals an extra (1d6) damage to the target.']],
      actions: [['Talon', 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit:(1d4+2) slashing damage']]
    },
    {
      bid: 2,
      monstername: 'Aboleth',
      type: 'Large aberration, lawful evil',
      ac: '17 (natural armor',
      maxhp: '18d10 + 36',
      speed: 10,
      burrowspeed: null,
      climbspeed: null,
      flyspeed: null,
      swimspeed: 40,
      str: 21,
      strmod: 5,
      dex: 9,
      dexmod: -1,
      con: 15,
      conmod: 2,
      int: 18,
      intmod: 4,
      wis: 15,
      wismod: 2,
      cha: 18,
      chamod: 4,
      savingthrows: 'Con +6, Int +8, Wis +6',
      skills: 'History +12, Perception +10',
      vulnerabilities: null,
      resistances: null,
      immunities: null,
      senses: 'Darkvision 120ft, passive Perception 20',
      languages: 'Deep Speech, telepathy 120 ft.',
      cr: 10,
      xp: 5900,
      extras: [['Amphibious', 'The aboleth can breathe air and water'], ['Mucous Cloud', 'While underwater, the aboleth is surrounded by ransformative mucus. A creature that touches the aboleth or that hits it with a melee attack while within 5 feet of it must make a DC 14 Constitution saving throw. On a failure, the creature is deseased for (1d4) hours. The diseased creature can breath only underwater'], ['Probing Telepathy', `If a creature communicates telepathically with the aboleth, the aboleth learns the creature's greatest desires if the aboleth can see the creature.`]],
      actions: [['Multiattack', 'The aboleth makes three tentacle attacks.'], ['Tentacle', `Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: (2d6+5) bludgeoning damage. If the target is a creature, it must succeed on a DC 14 Constitution saving throw or become diseased. The disease has no effect for 1 minute and can be removed by any magic that cures disease. After 1 minute, the diseased creature's skin becomes translucent and slimy, the creature can't regain hit points unless it is underwater, and the disease can be removed only by heal or another disease-curing spell of 6th level or higher. When the creature is outside a body of water, it takes (1d12) acid damage every 10 minutes unless moisture is applied to the skin before 10 minutes have passed.`], ['Tail', 'Melee Weapon Attack: +9 to hit, reach 10 ft. one target. Hit: (3d6 + 5) bludgeoning damage.'], ['Enslave (3/Day)', `The aboleth targets one creature it can see within 3 feet of it. The target must succeed on a DC 14 Wisdom saving throw or be magically charmed by the aboleth until the abolthe dies or until it is on a different plane of existence from the target. The charmed target is under the aboleth's control and can't take reactions, and the aboleth and the target can communicate telepathically with each other over any distance`], ['Legendary Actions', `The aboleth can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The aboleth regains spent legendary actions at the start of its turn. --Detect: The aboleth makes a Wisdom (Perception) check. --Tail Swipe: The aboleth makes one tail attack. --Psychic Drain (Costs 2 Actions): One creature charmed by the aboleth takes (3d6) psychic damage, and the aboleth regains hit points equal to the damage the creature takes.`]]
    },
    {
      bid: 3,
      monstername: 'Deva',
      type: 'Medium celestial, lawful good',
      ac: '17 (natural armor)',
      maxhp: '16d8 + 64',
      speed: 30,
      burrowspeed: null,
      climbspeed: null,
      flyspeed: 90,
      swimspeed: null,
      str: 18,
      strmod: 4,
      dex: 18,
      dexmod: 4,
      con: 18,
      conmod: 4,
      int: 17,
      intmod: 3,
      wis: 20,
      wismod: 5,
      cha: 20,
      chamod: 5,
      savingthrows: 'wis +9, Cha +9',
      skills: 'Insight +7, Perception +9',
      vulnerabilities: null,
      resistances: 'radiant; bludgeoning, piercing, and slashing from nonmagical weapons',
      immunities: 'charmed, exhaustion, frightened',
      senses: 'darkvision 120 ft., passive Perception 19',
      languages: 'all, telepathy 120 ft',
      cr: 10,
      xp: 5900,
      extras: [['Angelic Weapons', `The deva's weapon attacks are magical. When the deva hits with any weapon, the weapon deals an extra (4d8) radiant damage (included in the attack)`], ['Innate Spellcasting', `The deva's spellcasting ability is Charisma (spell save DC 17). The deva can innately cast the following spells, requiring only verbal components: --At will: detect evil and good, --1/day: commune, raise dead`], ['Magic Resistance', 'The deva has advantage on saving throws against spells and other magical effects.']],
      actions: [['Multiattack', 'The deva makes two melee attacks.'], ['Mace', 'Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: (1d6 + 4) bludgeoning damage plus (4d8) radiant damage.'], ['Healing Touch (3/Day)', 'The deva touches another creature. The target magically regains (4d8 + 2) hit points and is freed from any curse, disease, poison, blindness, or deafness.'], ['Change Shape', `The deva magically polymorphs into a humanoid or beast that has a challenge rating equal to or less than its own, or back into its true form. It reverts to its true form if it dies. Any equipment it is wearing or carrying is absorbed or borne by the new form (the deva's choice). In a new form, the deva retains its game statistics and ability to speak, but its AC, movement modes, Strength, Dexterity, and special senses are replaced by those of the new form, and it gains any statistics and capabilities (except class features, legendary actions, and lair actions) that the new form has but that it lacks.`]]
    }
  ];
}

function makeCampaignsArray() {
  return [
    {
      cid: 1,
      title: 'Azeroth',
      campaignuserid: 1
    },
    {
      cid: 2,
      title: 'Blest',
      campaignuserid: 2
    },
    {
      cid: 3,
      title: 'Camelot',
      campaignuserid: 3
    },
    {
      cid: 4,
      title: 'Discworld',
      campaignuserid: 4
    },
    {
      cid: 5,
      title: 'Essos',
      campaignuserid: 5
    },
    {
      cid: 6,
      title: 'Fillory',
      campaignuserid: 1
    },
    {
      cid: 7,
      title: 'Grishaverse',
      campaignuserid: 1
    },
    {
      cid: 8,
      title: 'Halla',
      campaignuserid: 2
    },
    {
      cid: 9,
      title: 'Idris',
      campaignuserid: 3
    }
  ];
}

function makeEncounterArray() {
  return [
    {
      eid: 1,
      encountername: 'Arbory',
      encounterdesc: 'Bandit gang',
      encountercampaignid: 1
    },
    {
      eid: 2,
      encountername: 'Bank',
      encounterdesc: 'Angry bank tellers',
      encountercampaignid: 2
    },
    {
      eid: 3,
      encountername: 'Castle Grounds',
      encounterdesc: 'Castle Guards',
      encountercampaignid: 3
    },
    {
      eid: 4,
      encountername: 'Dark Cave',
      encounterdesc: 'Goblins',
      encountercampaignid: 4
    },
    {
      eid: 5,
      encountername: `Eagle's Nest`,
      encounterdesc: 'Flock of Seagulls',
      encountercampaignid: 5
    },
    {
      eid: 6,
      encountername: 'Foyer',
      encounterdesc: 'Assassin Butler',
      encountercampaignid: 6
    },
    {
      eid: 7,
      encountername: 'Green Fields',
      encounterdesc: 'Wolves',
      encountercampaignid: 7
    },
    {
      eid: 8,
      encountername: 'Highland Forest',
      encounterdesc: 'Pixie Swarm',
      encountercampaignid: 8
    },
    {
      eid: 9,
      encountername: 'Island Retreat',
      encounterdesc: 'Merfolk Natives',
      encountercampaignid: 9
    },
    {
      eid: 10,
      encountername: `Jester's College`,
      encounterdesc: 'Prankster Pugilists',
      encountercampaignid: 1
    },
    {
      eid: 11,
      encountername: 'Karaoke Bar',
      encounterdesc: 'Rocking Rabble',
      encountercampaignid: 1
    },
    {
      eid: 12,
      encountername: 'Limestone Caverns',
      encounterdesc: 'Ant Warriors',
      encountercampaignid: 2
    }
  ];
}

function makeCharacterArray() {
  return [
    {
      pcid: 1,
      npc: false,
      pcclass: 'Monk',
      level: 3,
      pcname: 'pa1',
      initiative: null,
      ac: 15,
      hp: 23,
      hpmax: 29,
      pcencounterid: null,
      pccampaignid: 1,
      pcbestiaryid: null
    },
    {
      pcid: 2,
      npc: false,
      pcclass: 'Paladin',
      level: 3,
      pcname: 'pb1',
      initiative: null,
      ac: 15,
      hp: 32,
      hpmax: 32,
      pcencounterid: null,
      pccampaignid: 1,
      pcbestiaryid: null
    },
    {
      pcid: 3,
      npc: false,
      pcclass: 'Wizard',
      level: 3,
      pcname: 'pc1',
      initiative: null,
      ac: 12,
      hp: 15,
      hpmax: 20,
      pcencounterid: null,
      pccampaignid: 1,
      pcbestiaryid: null
    },
    {
      pcid: 4,
      npc: true,
      pcclass: null,
      level: null,
      pcname: 'Aarakocra',
      initiative: 5,
      ac: 12,
      hp: 24,
      hpmax: 24,
      pcencounterid: 1,
      pccampaignid: null,
      pcbestiaryid: 1
    },
    {
      pcid: 5,
      npc: true,
      pcclass: null,
      level: null,
      pcname: 'Aboleth',
      initiative: 5,
      ac: 17,
      hp: 88,
      hpmax: 126,
      pcencounterid: 1,
      pccampaignid: null,
      pcbestiaryid: 2
    },
    {
      pcid: 6,
      npc: true,
      pcclass: null,
      level: null,
      pcname: 'Deva',
      initiative: 13,
      ac: 17,
      hp: 64,
      hpmax: 100,
      pcencounterid: 1,
      pccampaignid: null,
      pcbestiaryid: 3
    }
  ];
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      users,
      bestiary,
      characters,
      encounters,
      campaigns
      RESTART IDENTITY CASCADE`
  );
}

function seedBestiary(db, monsters) {
  return db.into('bestiary').insert(monsters)
    .then(() =>
      db.raw(
        `SELECT setval('bestiary_bid_seq',?)`,
        [monsters[monsters.length - 1].bid]
      )
    );
}

function seedUsers(db, users) {
  return db.into('users').insert(users)
    .then(() =>
      db.raw(
        `SELECT setval('users_uid_seq',?)`,
        [users[users.length - 1].uid]
      )
    );
}

function seedEncounterTables(db, users, bestiary, campaigns = [], encounters = [], characters = []) {
  return db.transaction(async trx => {
    await seedUsers(trx, users);
    await seedBestiary(trx, bestiary);
    await trx.into('campaigns').insert(campaigns);
    await trx.raw(
      `SELECT setval('campaigns_cid_seq',?)`,
      [campaigns[campaigns.length - 1].cid]
    );
    await trx.into('encounters').insert(encounters);
    await trx.raw(
      `SELECT setval('encounters_eid_seq',?)`,
      [encounters[encounters.length - 1].eid]
    );
    await trx.into('characters').insert(characters);
    await trx.raw(
      `SELECT setval('characters_pcid_seq',?)`,
      [characters[characters.length - 1].pcid]
    );
  });
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.uid }, secret, {
    subject: user.username,
    algorithm: 'HS512'
  });
  return `Bearer ${token}`;
}

const makeEncounterData = (encounter, campaigns) => { return { ...encounter, ...campaigns.find(campaign => campaign.cid == encounter.encountercampaignid) }; };

function makeFixtures() {
  const testUsers = makeUsersArray();
  const testCampaigns = makeCampaignsArray();
  const testBestiary = makeBestiaryArray();
  const testEncounters = makeEncounterArray();
  const testCharacters = makeCharacterArray();
  return { testUsers, testBestiary, testCampaigns, testEncounters, testCharacters };
}

module.exports = {
  makeBestiaryArray,
  makeUsersArray,
  makeCampaignsArray,
  makeEncounterArray,
  makeCharacterArray,
  makeEncounterData,
  makeFixtures,

  cleanTables,
  seedBestiary,
  seedUsers,
  seedEncounterTables,
  makeAuthHeader,
};