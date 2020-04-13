import 'phaser'
import {Game} from './game'
// You can change fmodstudio to fmodstudioL to have debugging info
import FMODModule, {FMOD as FMOD_} from './lib/fmodstudio'

/*** Main game ***/
const config =
{
  type: Phaser.AUTO,
  scale: {
    width: 1000,
    height: 1000,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics:
  {
    default: 'arcade',
    arcade:
    {
      gravity: { y: 0 },
    },
  },
  scene: [Game],
}

/*** FMOD setup ***/
// Do NOT forget to include Master to have sound
const banks =
[
    "Master.bank",
    "Master.strings.bank",
    "Music.bank",
]

// Exporting FMOD so as to have it around as a global object
export let FMODStudio = null

const FMOD: FMOD_ = 
{
  TOTAL_MEMORY: 64 * 1024 * 1024,

  preRun()
  {
    // We need to preload files before accessing them later!
    banks.map(i => FMOD.FS_createPreloadedFile(".", i, i, true, false))
  },

  // We can only access FMOD in onRunTimeInitialized. Hence we launch the game inside it
  onRuntimeInitialized()
  {
    const out = {val: null}
    
    FMOD.Studio_System_Create(out)
    FMODStudio = out.val
    FMODStudio.initialize(128, FMOD.STUDIO_INIT_NORMAL, FMOD.INIT_NORMAL, null)

    // Loading banks, so that we can use getEvent normally after
    banks.map(i => FMODStudio.loadBankFile(i, FMOD.STUDIO_LOAD_BANK_NORMAL, {}))

    // Finally run game
    const game = new Phaser.Game(config)
  },
}

FMODModule(FMOD)


/*** Resume audio on user input ***/
let resumed = false
function resumeAudio() 
{
  if(resumed)
    return

  const core = {val: null}
  FMODStudio?.getCoreSystem(core)

  core.val?.mixerSuspend()
  core.val?.mixerResume()

  resumed = true
}
document.addEventListener('click', resumeAudio)

