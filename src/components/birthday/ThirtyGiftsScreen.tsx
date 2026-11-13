import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Play, Pause, Mic } from 'lucide-react';
import { FallingPetals } from './FallingPetals';

// Import des messages vocaux de Papa et Babacar Faty
import audioPapa from '../../assets/audio_papa.ogg';
import audioBabacar from '../../assets/audio_babacar.ogg';

interface ThirtyGiftsScreenProps {
  onBackToCountdown?: () => void;
  onGoToOurMemory?: () => void;
}

export interface GiftItem {
  id: number;
  name: string;
  title: string;
  message: string;
  audio?: string;
}

// 30 messages et cadeaux personnalisés offerts par ses 30 proches
export const GIFTS_LIST: GiftItem[] = [
  {
    id: 1,
    name: 'Papa',
    title: 'Papa',
    audio: audioPapa,
    message: `Joyeux anniversaire Aminata ! ❤️🎙️

Voici un message vocal plein d'amour, de fierté et de bénédictions de la part de ton Papa.

Prends un instant pour écouter sa voix :`
  },
  {
    id: 2,
    name: 'Maman',
    title: 'Maman',
    message: `À ma fille, mon précieux cadeau de الله SWT,

Ma chérie,

Il y a des choses qu’une mère ressent profondément, mais qu’elle ne prend pas toujours le temps d’exprimer. Aujourd’hui, j’aimerais te rappeler à quel point tu comptes pour moi et combien je suis reconnaissante d’avoir été choisie pour être ta maman.

Depuis le jour où tu es entrée dans ma vie, tu y as laissé une empreinte que rien ni personne ne pourra jamais effacer. Je t’ai vue grandir, évoluer, découvrir le monde, faire tes propres expériences et devenir, petit à petit, la personne que tu es aujourd’hui. Et même si les années passent, tu resteras toujours cette petite fille que j’ai envie de protéger de tout ce qui pourrait lui faire du mal.

Je ne prétendrai pas être une mère parfaite. J’ai certainement commis des erreurs, eu des mots maladroits ou manqué certaines occasions de te montrer ce que je ressentais. Mais j’espère que tu n’as jamais douté de mon amour. Un amour qui ne dépend ni de tes réussites, ni de tes échecs, ni de tes choix. Tu n’as pas besoin de mériter ma tendresse : tu es ma fille, et cela suffit.

Je veux que tu saches que je suis fière de toi. Pas uniquement pour ce que tu accompliras dans la vie, mais pour la personne que tu es. Pour ton cœur, tes efforts, ta sensibilité et toutes ces petites choses que tu fais peut-être sans même t’en rendre compte.

La vie ne sera pas toujours facile, Aminata. Tu rencontreras des personnes qui ne sauront pas apprécier ta valeur, des situations qui mettront ta patience à l’épreuve et des moments où tu douteras peut-être de toi-même. Mais je voudrais que tu n’oublies jamais de te respecter, de préserver ton cœur et de ne jamais laisser les difficultés te faire oublier qui tu es.

Je ne pourrai malheureusement pas être présente à chaque instant de ta vie. Je ne pourrai pas toujours te tenir la main, intervenir lorsque tu rencontreras une difficulté ou te donner toutes les réponses. Mais je prie الله SWT de t’accompagner là où mes bras ne pourront pas t’atteindre.

Je demande à الله SWT de protéger chacun de tes pas, de préserver ton cœur, de t’accorder une santé solide, une foi sincère et une vie remplie de sérénité. Qu’Il t’éloigne de ce qui pourrait te nuire, qu’Il facilite tes projets et qu’Il mette sur ton chemin des personnes dont les intentions seront aussi belles que celles que tu mérites.

Et surtout, mina, je demande à الله SWT de nous accorder le bonheur de nous retrouver au paradis. Car mon amour pour toi ne s’arrête pas à cette vie. C’est aussi là que j’espère te retrouver.

Grandis, apprends, découvre, accomplis tes rêves et construis une vie dont tu seras heureuse. Mais n’oublie jamais que, quels que soient ton âge, tes responsabilités ou le chemin que tu choisiras, tu auras toujours une maman qui priera pour toi.

Je t’aime d’un amour que les mots ne pourront jamais entièrement contenir.

Ta maman, qui t’aimera dans cette vie et qui espère te retrouver dans l’au-delà.`
  },
  {
    id: 3,
    name: 'Awa Faty',
    title: 'Awa Faty',
    message: `À ma très chère, grande petite sœur,

Aujourd’hui, je tenais à te parler à cœur ouvert. Si un jour j’avais le choix de changer de sœur, je ne le ferais pas.

Meena, avec toi, je ne ressens même pas la différence d’âge. Tu es devenue ma meilleure amie, mon pilier, ma jumelle avec quatre ans d’écart.

Depuis toute petite, je sais, au plus profond de mon cœur et de mon âme, que si un jour la situation se présentait et que je devais te donner un organe pour que tu puisses rester à mes côtés, je le ferais. Si je devais mourir un jour, je demanderais à ce que ta tombe soit à côté de la mienne. Je demanderais à الله SWT de faire en sorte que tu me reconnaisses dans l’au-delà, qu’Il nous laisse les souvenirs que nous avons partagés au cours de cette vie. Qu’Il me laisse ma jumelle de quatre ans d’écart.

Je t’aime tellement que je crois que cette phrase ne suffira jamais à exprimer à quel point je suis reconnaissante de t’avoir dans ma vie.

Tu sais, je crois profondément que nous partageons bien plus qu’un simple lien de sœurs. Je ressens tes peines, tes colères, tes joies, parfois comme si elles étaient les miennes. Et le fait de pouvoir les partager avec toi me fait tellement de bien, parce que je sais que tu ne seras jamais seule.

Je dis parfois que tu es ma petite sœur parce que je ressens constamment ce besoin de te protéger, envers et contre tous. Comme on dit : « Je brûlerais le monde pour toi », et nous le ferions à deux (sauf pour notre petite famille, évidemment).

Parfois, je te sens si fragile que j’aimerais pouvoir t’épargner toute la méchanceté de ce monde. Lorsque nous discutons pendant des heures, au point d’oublier toutes les choses, intérieures comme extérieures, qui nous entourent, je te redécouvre. Et je réalise une nouvelle fois à quel point j’ai de la chance de t’avoir.

Tu as toujours été là. Tu as su jouer ton rôle de grande sœur : celle qui est parfois énervante, certes, mais surtout celle qui m’a toujours choisie, protégée et fait en sorte que je me sente bien. Celle qui a su me relever lorsque je me sentais seule. Celle sur qui j’ai toujours pu compter.

Tu fais partie de ces personnes rares, de celles qui semblent malheureusement se faire de plus en plus rares dans ce monde.

Meena, je suis tellement fière de toi. Si seulement tu pouvais te voir à travers mes yeux… Tu y verrais toute l’admiration que j’ai pour toi. Tu es la lune dans un ciel rempli d’étoiles. Tu brilles, et tu brilleras encore plus fort.

Qu’ الله SWT te protège et te guide dans les moments les plus difficiles. Qu’ الله SWT te bénisse, qu’Il t’accorde une vie pleine de quiétude, de bonheur et de sagesse.

Qu’ الله SWT soit ta lumière lorsque je ne serai pas là.

Je serai toujours là pour veiller sur toi, garder tes arrières, comme ton ombre. Peu importe les circonstances, tu pourras toujours compter sur moi.

Je t’aime, et je t’aimerai encore au paradis.

Qu’ الله SWT fasse que nous nous retrouvions au paradis, ma sœur.

Ta petite sœur,
Awa Faty…`
  },
  {
    id: 4,
    name: 'Moussa Faty',
    title: 'Moussa Faty',
    message: `Tu es une personne formidable, mais surtout admirable. Tu as quelque chose d’une mère : tu sais prendre soin des autres, les écouter et leur apporter de l’affection. Tu as un cœur aussi vaste que la mer.

Tu es ma meilleure amie, mais aussi ma grande sœur, celle que j’admire énormément. Tu occupes une grande place dans mon cœur et dans ma vie. Tu as toujours été gentille, attentionnée et présente.

Merci. Merci pour tout ce que tu fais, pour tout ce que tu es et pour l’amour que tu nous donnes. Si tu es aimée de tant de personnes, c’est parce que tu sais, à ta manière, te rendre aimable et attachante. Tu es une personne adorable, et j’espère que tu n’en douteras jamais.

Je suis heureux de t’avoir comme grande sœur.

Ton petit frère,
Moussa Faty`
  },
  {
    id: 5,
    name: 'Babacar Faty',
    title: 'Babacar Faty',
    audio: audioBabacar,
    message: `Joyeux anniversaire Meena ! ❤️🎙️

Voici un message vocal plein d'amour et de tendresse de la part de ton petit frère Babacar.

Prends un instant pour écouter sa voix :`
  },
  {
    id: 6,
    name: 'Anthia Rodriguez',
    title: 'Anthia Rodriguez',
    message: `Joyeux anniversaire Barre Faty !

Je t’écris pour te souhaiter un joyeux anniversaire et aussi te transmettre toute mon affection. Je ne te connais que depuis cette année et pourtant je me sens à l’aise avec toi comme si je te connaissais depuis longtemps.

Tu es vraie et cela se voit avec ta manière de te comporter avec les gens, et c’est cela qui m’a le plus marqué chez toi.

Je te souhaite le meilleur, surtout la santé et le courage de continuer. C’est de ça que tu as vraiment besoin et le reste suivra. Vis bien et longtemps pour qu’on puisse encore partager des moments ensemble.

Je t’aime fort.`
  },
  {
    id: 7,
    name: 'Sadibou seck',
    title: 'Sadibou seck',
    message: `Joyeux anniversaire Amina !

Je te souhaite un très bel anniversaire, rempli de joie, de bonheur et de belles surprises. Que Dieu te donne une longue vie, une bonne santé et beaucoup de réussite dans tout ce que tu entreprends.

Yallah nala yallah def milliardaire parce que t'aime trop la vie de luxe !

Rew rek laye dioye si iow mais sama waay gua lolou dou dagne sakh.

Encore joyeux anniversaire à toi !
Love u fami f`
  },
  {
    id: 8,
    name: 'Alioune Souley',
    title: 'Alioune Souley',
    message: `Amina,

Aujourd’hui est un jour spécial, parce qu’il célèbre la naissance d’une personne qui mérite vraiment de belles choses. Je ne sais pas toujours trouver les mots justes pour exprimer ce que je pense, mais je voulais prendre un moment pour te dire à quel point tu es une personne particulière.

Tu as cette façon d’être, cette gentillesse et cette simplicité qui font qu’on ne peut pas te confondre avec quelqu’un d’autre.

Je te souhaite de garder cette belle personnalité, de ne jamais perdre ton sourire et de toujours trouver des raisons d’être heureuse. Que cette nouvelle année de ta vie t’apporte la paix, la santé, de belles réussites et surtout des moments qui te feront du bien.

J’espère que la vie sera aussi douce avec toi que tu peux l’être avec les personnes qui ont la chance de te connaître.

Profite pleinement de ta journée, Amina. Tu mérites sincèrement le meilleur.`
  },
  {
    id: 9,
    name: 'Mame Fatou',
    title: 'Mame Fatou',
    message: `To my lovely cousinnnnn,

Je ne suis pas vraiment douée pour les lettres but I’ll try my best. En ce jour si spécial, je te souhaite du plus profond de mon cœur tout ce qu’il y a de mieux pour toi.

Que cette nouvelle année soit mille fois mieux que la précédente. Que Dieu éloigne de ton chemin tout ce qui pourrait ternir ton sourire, qu’Il protège ton cœur, guide tes pas et fasse de chacun de tes rêves une réalité. Qu’Il fasse de toi une femme accomplie et pleine de succès.

Merci simplement d’être toi. Je ne te souhaite pas seulement un joyeux anniversaire, je te souhaite une vie magnifique, remplie de tout ce que ton cœur mérite.

Je t’aime baby.`
  },
  {
    id: 10,
    name: 'Rianne',
    title: 'Rianne',
    message: `Joyeux anniversaire ma Amina, ma vieee !

Franchement, même si on ne se connaît que depuis cette année, j’ai l’impression qu’on se connaît depuis bien plus longtemps. En si peu de temps, tu as réussi à prendre une place spéciale dans mon cœur et je suis vraiment contente de t’avoir rencontrée.

Tu es une personne que j’apprécie énormément. J’aime ta joie de vivre, ton énergie, ta façon d’être et surtout cette bonne humeur que tu apportes partout où tu passes. Tu fais partie de ces personnes qui rendent les moments plus beaux sans même s’en rendre compte.

Je veux que tu saches que je tiens énormément à toi et que tu pourras toujours compter sur moi, peu importe les circonstances. Je serai là dans les bons comme dans les mauvais moments.

Pour cette nouvelle année de ta vie, je te souhaite tout ce qu’il y a de plus beau : beaucoup de bonheur, la santé, de l’amour, de la réussite et surtout la réalisation de tous tes rêves. Que Dieu veille sur toi, te protège et t’accorde tout ce que ton cœur désire.

Ne change surtout pas, reste cette belle personne pleine de vie que j’ai eu la chance de rencontrer.

Je t’aime fort ma Amina. Profite bien de ta journée, tu le mérites tellement.`
  },
  {
    id: 11,
    name: 'Al Amine',
    title: 'Al Amine',
    message: `Amina Faty,

Franchement je ne te le dis peut-être pas souvent mais je suis vraiment content de t’avoir dans ma vie. Tu es une personne rare, gentille, disponible, sans façon et toujours souriante.

Tu es sincèrement ma seule vraie amie et je tiens énormément à toi. Te voir heureuse me fait tellement plaisir, si tu savais à quel point.

Je te souhaite vraiment le meilleur dans tout ce que tu entreprends. Ne change surtout pas, reste comme tu es, tu es une personne en or.

Love you bestie !`
  },
  {
    id: 12,
    name: 'Aïssatou',
    title: 'Aïssatou',
    message: `Happy Birthday ma Faty !

Ma petite sœur Rakou Aïssatou, tellement gentille, serviable, attentionnée et toujours avec un grand cœur. Bakh si mane gaw si mane foumala wo ga bayi lep nieuw ga beug ma beug bou sincère walahi foum tournée yagui sam wet. Yallah nala yallah same nak meyla yokouter ga yok ba yek ko mounek lou gueun si ioe in sha Allah.

Tu représentes énormément pour moi, tu as une place très spéciale dans mon cœur et je suis reconnaissante de t’avoir dans ma vie.

Je te souhaite tout le bonheur du monde, une longue vie remplie de santé, de réussite, de paix et de belles choses. Qu’Allah veille sur toi, te protège de tout mal, exauce tes vœux les plus chers et t’accorde une vie pleine de bénédictions.

Ne change surtout pas cette belle personne que tu es. Reste toujours aussi douce, adorable et généreuse. Tu mérites tout ce qu’il y a de meilleur dans cette vie.

Profite pleinement de ta journée, ma chérie. Je t’aime énormément.

Happy Birthday encore ma petite sœur !`
  },
  {
    id: 13,
    name: 'Paye',
    title: 'Paye',
    message: `En ce jour si spécial, je remercie Dieu pour ta vie et pour le cadeau précieux que tu es dans la mienne.

Tu es une amie au cœur généreux, et je prie que cette nouvelle année t'apporte paix, santé et bonheur. Que Dieu te bénisse et te protège chaque jour. Qu'Il éclaire ton chemin et t'accorde la force, la sagesse et la joie de réaliser tous tes rêves.

Je prie pour que ta vie soit remplie d'amour, de réussite et de belles surprises. Que chaque matin t'apporte l'espérance, et chaque soir la gratitude. Merci d'être cette amie sincère et fidèle. Je demande à Dieu de te garder longtemps auprès de nous, entourée de ceux qui t'aiment.

Joyeux anniversaire Amina FATY. Que le Seigneur te bénisse abondamment et que cette nouvelle année soit la plus belle de toutes.

Amiiiine you already know what I’m saying love uuu

Avec toute mon affection,
PAYE`
  },
  {
    id: 14,
    name: 'Leye',
    title: 'Leye',
    message: `Happy birthday NICKY MINAJ !

Ndeysanne mère rasta moye sa yaye Mamadou faty di sa baye kharite sama. Yallah na yallah maye goudou fanne akh werr gnou yaram. Lo beugue yako kham yallah nala ko yallah defal.

Franchement nitt kou bakh wathié sa bopp meune dieulé rekk la dioye si ioe mais tkt tame nako.

Breff profite de ton jour nickyyyyyyy !`
  },
  {
    id: 15,
    name: 'Ahmed',
    title: 'Ahmed',
    message: `Heureuse fête d'anniversaire ma moitié !

Je te souhaite le meilleur vœu du monde, que tous tes rêves et tes souhaits se réalisent. Je suis tellement chanceuse d'avoir une moitié comme toi dans ma vie.

Ce message d'anniversaire ne suffit pas pour exprimer en mots l'amour que j'ai pour toi ma moitié adorée. Je prie beaucoup pour que le Bon Dieu t'accorde une longue vie pleine d'amour, de bonheur et de santé, réussite totale inchallah afin que nous soyons ensemble pour toujours.

Joyeux anniversaire ma moitié adorée, je t'aime très fort et je t'aimerai pour toujours l'amour de ma vie.

Love you ❤️`
  },
  {
    id: 16,
    name: 'Papi Diagne',
    title: 'Papi Diagne',
    message: `En ce jour si spécial à tes yeux, j’en profite pour te souhaiter mes meilleurs vœux ! J’te souhaite une vie remplie de bonheur, d’amour, d’argent et pleine de bonnes choses inchallah.

T’es une personne, même si je te le montre pas très souvent, mais dagua nekeu sama kharit beu nopi gua done nitt kou bakh yayou beurri diameu drôle vrmt. Amina t’es une personne sans façon wallah, rew rk laye dioye si iow.

Mane ak iow bignou, je peux dire yaggeuna yagoul car j’ai eu de plus vieilles conversations avec certaines, mais iow genre déjà dague gneuwe nekeu nouvelle si je ne me trompe pas, mane gua ndieukeu khamanteil si gorou classe yih. Bagnou done wakhtan gnou commencer di raconter ay foli, tu me disais comment t’aimais Nicki et moi de même comment j’aimais Pop Smoke, vrmt c’est des choses que je suis pas prêt à oublier. T’es venue, à peine on a commencé à se côtoyer puis devenir des amis, même si on n'est pas si proches que ça car meune nagne toke beneu moment bo khamni on ne peut pas s’entendre, mais à chaque fois que soumala deiguei rk la même énergie revient. Franchement ne change pour rien au monde !

En dehors de tout ça tmit, khana ma bayi leuh ak sougnou borom rk mou faye leuhh seu kholl bou rafette bi, yeinei yi gua am sisay waydiour yalnako sa borom motali. Tout ce que t’auras à entreprendre dans ta vie qu’Allah fasse le meilleur pour toi tei mou djik leuhh ba yenenen ak yenenen topou si. Gua MAGGEU ba am dieukeur djou bakhe djou melni mane... non je blague, bouma geune foufe beugeu leuhh tei yallah takhe fassienei diamou yallah ak iow. Sougne borom sameu leuhh are leuhh gua am ndiabote djou barkei tei mayla tawfekh djou beurri bagua meune si dimbali thie nitt yila yallah seddeu.

Bref, mes mots ne suffiront jamais pour t’écrire en ce jour, mais sache que nitt mo matoul rk tei limay yeinei sama bopp rk laleu yeinei.

Loveeee uuuu my ggggg !`
  },
  {
    id: 17,
    name: 'Aysha',
    title: 'Aysha',
    message: `À ma presque jumelle,

Depuis l’élémentaire, on en a vécu des choses ! Entre nos disputes et nos chamailleries, on ne se laisse jamais tranquilles.

Mais malgré tout, je t’aime énormément et je suis heureuse de t’avoir dans ma vie. Un seul jour nous sépare, mais des années d’amitié nous unissent.

Reste comme tu es, ma vieille d’un jour.

Je t’aime fort !`
  },
  {
    id: 18,
    name: 'Cellou',
    title: 'Cellou',
    message: `Pour dire vrai c’est pas dans mes habitudes d’écrire des lettres ou des trucs du genre, mais t’es une personne qui mérite beaucoup de bonnes choses dans ta vie Amina.

Même si on n'est pas trop proches l’un de l’autre, je tiens vraiment à te souhaiter mes meilleurs vœux, que cette journée te soit inoubliable ! T’es une personne grave gentille, drôle et attentionnée. Je te souhaite ce que je me souhaite à ma propre personne.

Sur ce, j’en profite pour te souhaiter une vie remplie de bonheur, d’amour et pleine de bonnes choses, réussite totale dans tout ce que t’auras à entreprendre dans ta vie. Qu’Allah te facilite tout et te donne beaucoup d’argent afin de pouvoir aider tes parents dans le besoin.

En outre, je ne suis pas le meilleur pour m’exprimer à travers des textes mais sache que je t’apprécie énormément et j’espère que ces mots t’iront droit au cœur.

Vis bien et longue vie à nous my gggg !`
  },
  {
    id: 19,
    name: 'Dior Virginie',
    title: 'Dior Virginie',
    message: `Joyeux anniversaire, ma Faty d’amour !

Si on m’avait dit l’année dernière, pendant la CAN, que la fille qui allait me sortir un jour « On ne se connaît pas, mais je vais te casser la gueule » allait devenir une aussi belle personne dans ma vie, je n’y aurais jamais cru !

Et pourtant, c’est comme ça que tout a commencé, entre les fous rires, les moments partagés et les souvenirs qu’on s’est créés. Aujourd’hui, je remercie Dieu d’avoir mis cette belle personne sur mon chemin.

Tu es une femme magnifique, autant à l’extérieur qu’à l’intérieur, avec un cœur en or. Ta gentillesse, ta générosité et ta façon d’être font de toi une personne spéciale.

Pour cette nouvelle année de ta vie, je prie que Dieu t’accorde tout le bonheur du monde, qu’Il protège ton cœur, qu’Il réalise tes rêves et qu’Il t’ouvre des portes que personne ne pourra fermer. Que tu ne manques jamais d’amour, de santé, de paix et de raisons de sourire. Que Dieu te rende au centuple tout le bien que tu fais autour de toi.

Je suis heureuse que notre histoire ait commencé par une menace au lieu d’un bonjour ! Qui aurait cru que « je vais te casser la gueule » allait donner naissance à une aussi belle amitié ?

Merci d’être toi, ma Faty. Que cette amitié dure encore longtemps et qu’on ait plein d’autres souvenirs à raconter. Joyeux anniversaire, ma belle ! Je prie pour toi aujourd’hui et toujours. Je t’aime fort, et surtout, ne change jamais ce beau cœur que tu as.

Maison Hathor thiaaa kanameeee rek ma belle !`
  },
  {
    id: 20,
    name: 'Kadeza',
    title: 'Kadeza',
    message: `Joyeux anniversaire Minaaaaaa !

On s'est connues à l'élémentaire, puis on a continué ensemble au collège. Ça fait déjà pas mal d'années, et j'avoue que ça fait plaisir de se dire qu'on se connaît depuis aussi longtemps. Et durant tout ce temps t’es restée la merveilleuse personne que tu es.

Même si l'école nous a séparées, on a gardé contact et on se parle assez souvent. Ça me touche, parce que ce n'est pas toujours évident de rester en lien avec les gens qu'on a connus plus jeunes.

Je te souhaite une très belle année, pleine de joie, de réussite et de belles surprises. Que tes projets se réalisent et que cette nouvelle année t'apporte tout ce que tu espères. Dila nianal lo beugg rkk yalna lako yalla deffal. Tu es une belle âme, profite bien !

Je t'embrasse très fort !
Kadeza`
  },
  {
    id: 21,
    name: 'Aïssatou Mbodj',
    title: 'Aïssatou Mbodj',
    message: `Joyeux anniversaire à ma personne précieuse, ma best, ma sœur de cœur !

Je ne trouverai jamais assez de mots pour te remercier d'être cette personne merveilleuse qui a toujours été là pour moi, dans mes joies comme dans mes moments difficiles. Merci pour ton amour, ton soutien, ton écoute et surtout pour ne jamais m'avoir lâchée.

Ta présence dans ma vie est un véritable cadeau et je remercie Dieu de t'avoir mise sur mon chemin.

Je te souhaite tout le bonheur du monde, parce que tu mérites tout ce qu'il y a de plus beau. Que cette nouvelle année t'apporte la santé, la réussite, l'amour et la réalisation de tous tes rêves.

Je t'aime énormément, et peu importe ce que la vie nous réserve, sache que tu auras toujours une place spéciale dans mon cœur.

Joyeux anniversaire, ma best d'amour !`
  },
  {
    id: 22,
    name: 'Seynabou Gina',
    title: 'Seynabou Gina',
    message: `À ma petite Nicky D’amour,

Joyeux anniversaire à toi mon bébé ! Je ne sais même pas par où commencer tellement j’ai de choses à te dire et tellement tu comptes pour moi.

Six ans. Six longues années qu’on se connaît depuis la seconde jusqu’à maintenant, on a vécu ensemble tellement de choses. On a grandi ensemble, on a partagé des souvenirs que je garderai toute ma vie. Et si je devais refaire le chemin, je te choisirais encore et encore.

Je prie Allah de te préserver, de te protéger de tout mal, de t’accorder une longue vie, une réussite immense et un bonheur à la hauteur de ton magnifique cœur. Qu’Allah réalise tes rêves, même ceux que tu n’oses pas encore exprimer. Qu’Il t’éloigne de tout ce qui pourrait te faire du mal et mette sur ton chemin tout ce qui est bon pour toi.

Et surtout, je prie Allah de préserver notre amitié. Qu’Il ne laisse jamais la vie, la distance, le temps ou les épreuves nous éloigner. Mon rêve, et je suis très sérieuse quand je le dis, c’est qu’un jour quand nous aurons nos propres familles, nos enfants deviennent meilleurs amis à leur tour. Imagine nos enfants qui grandissent ensemble comme nous avons grandi ensemble ! C’est quelque chose que j’aimerais tellement vivre avec toi. Je veux qu’on soit ces deux mamans qui se racontent encore leurs vies, qui se retrouvent et qui continuent à rire comme deux adolescentes.

Et peu importe ce que la vie nous réserve, sache une chose : je serai toujours là pour toi. Dans tes victoires, dans tes peines, dans tes projets et dans tous les nouveaux départs que tu auras à vivre. Tu n’auras jamais à te demander si tu peux compter sur moi. Je serai là parce que tu es ma personne préférée.

Joyeux anniversaire encore ma bestie d’amour, je te souhaite une vie aussi belle que ton cœur. Je t’aime de toute mon âme Amina, aujourd’hui, demain et pour toutes les années qui nous restent à vivre.

À nous, et à toutes les décennies qui nous attendent Insha’Allah !

Gina.`
  },
  {
    id: 23,
    name: 'Mamy Faye',
    title: 'Mamy Faye',
    message: `Joyeux anniversaire Westie Sis !

En vrai je ne sais même pas par où commencer du coupppp, yallah nala yallah fay seu xol Faty Aidara.

Tu comptes énormément pour moi. Vraiment énormément. Peut-être que je ne te le dis pas assez souvent, mais je le pense tout le temps.

T'es une personne tellement gentille. Tu as un cœur en or, le cœur sur la main, toujours là pour moi. Quand j'ai besoin de toi tu réponds. Quand j'ai besoin de parler tu m'écoutes. Toujours disponible même quand toi aussi tu as des choses à gérer. Même si je suis pas facile à vivre tu t’énerves quasiment jamais. Franchement, je ne sais pas comment tu fais. Tu as une patience incroyable teh lolou bokk na si li geuneu takh meu diapla Amina.

Tu apportes de la douceur autour de toi et les gens qui t'entourent ont beaucoup de chance. Je sais que je ne suis pas tout le temps présente, je ne suis pas tout le temps disponible. Des fois, la vie va vite et j'ai la tête ailleurs. Mais je veux que tu saches une chose : je serai toujours là pour toi. Toujours. Si tu as besoin de moi, tu peux venir toquer à ma porte, à n'importe quelle heure. Sans prévenir, sans te poser de questions. Je serai là pour t'écouter, pour te soutenir. Tu ne seras jamais seule.

Je te souhaite tout le bonheur du monde, Amina. Tu le mérites tellement. Je te souhaite de la joie, de la paix, de la santé et énormément de bonheur. Je te souhaite que tous tes rêves se réalisent, et que cette nouvelle année soit encore plus belle que les autres.

Merci d'être là.

Love u Fam ❤️`
  },
  {
    id: 24,
    name: 'Papa Babacar',
    title: 'Papa Babacar',
    message: `T’es pas juste ma cousine, t’es aussi ma sœur et mon amie.

Franchement, je suis trop content de t’avoir dans ma vie. Qu’Allah te protège, te donne une longue vie, beaucoup de bonheur et réalise tous tes rêves.

Je te souhaite que du bien, parce que tu mérites vraiment d’être heureuse. Reste comme tu es et ne change jamais.

Je t’aime fort, profite bien de ta journée, tu le mérites. Joyeux anniversaire encore une fois !

Ton cousin, ton frère et ton ami,
Pape Babacar Diaïté`
  },
  {
    id: 25,
    name: 'Aziz Mdodj',
    title: 'Aziz Mdodj',
    message: `Mon amour,

Je ne sais même pas vraiment par où commencer, mais j’avais envie de prendre le temps de t’écrire quelques mots qui viennent sincèrement de mon cœur.

Depuis ce fameux 23 mars, le jour où on s’est rencontrés, il y a quelque chose de particulier qui a commencé dans ma vie. À ce moment-là, je ne savais pas encore ce que tu allais représenter pour moi, ni jusqu’où notre histoire allait nous mener. Aujourd’hui, je peux dire que je suis vraiment heureux que nos chemins se soient croisés.

Tu es devenue une personne importante pour moi, quelqu’un à qui je pense, quelqu’un dont la présence compte et avec qui j’ai envie de partager beaucoup de choses.

Je sais que je ne suis pas parfait, que je peux parfois avoir mes défauts, ne pas toujours trouver les bons mots ou ne pas forcément montrer mes sentiments comme il le faudrait. Mais ne doute jamais de la place que tu occupes dans mon cœur.

Je ne veux pas juste être là quand tout va bien. Je veux aussi être celui sur qui tu peux compter dans les moments difficiles. Je veux qu’on apprenne à se comprendre, qu’on grandisse ensemble et qu’on construise quelque chose de sincère, sans se laisser décourager par les difficultés.

Je ne sais pas ce que demain nous réserve, mais j’ai envie de le découvrir avec toi. Je ne te promets pas la perfection, je te promets simplement d’être sincère dans mes sentiments et de faire des efforts pour préserver ce qu’on a. Parce qu'un avenir sans toi serait inimaginable.

Finalement, je remercie la vie pour ce 23 mars, parce que ce jour-là, sans forcément le savoir, j’ai rencontré une personne qui allait prendre une belle place dans ma vie.

Je tiens à toi plus que mes mots ne peuvent parfois le montrer ❤️`
  },
  {
    id: 26,
    name: 'Marianne',
    title: 'Marianne',
    message: `À TOI, NICKY !

Bon, par où commencer ? Déjà, joyeux anniversaire ma belle Nicky !

Je voulais profiter de cette occasion pour te dire quelques petits mots. Tu es vraiment une personne que j’apprécie beaucoup. On ne fait peut-être pas partie de ces amies qui s’appellent tous les jours ou qui prennent constamment des nouvelles, mais j’aime le fait qu’on puisse garder ce lien et retrouver notre complicité chaque fois qu’on se voit, comme si on ne s’était jamais quittées.

Tu es une fille vraiment adorable, avec un cœur en or. Tu as cette facilité à vivre avec les autres, tu ne te prends pas trop la tête et tu es toujours prête à être là pour les personnes que tu aimes. Tu es généreuse, tu aimes partager ce que tu as et tu as cette belle façon de donner sans forcément attendre quelque chose en retour. C’est une qualité que j’apprécie énormément chez toi.

Et puis, il faut quand même rappeler que tu fais partie des filles qui ont tout le package : belle, bonne et bête ! Nos fameux trois B ! Non Amina change tu es trop bête 😂 En plus d’être belle, tu es bien chargée en bas, donc vraiment, Masha’Allah !

J’aime aussi ton côté entrepreneuse et ton ambition. Avec Maison Hator, tu nous montres que tu as envie de construire quelque chose qui t’appartient. Je te souhaite vraiment de voir ta marque grandir et de connaître une très belle réussite.

Bon, je ne peux pas oublier ton amour pour la belle vie ! Madame aime les belles choses, les bons endroits, les voyages, les découvertes et tout ce qui fait plaisir. Même quand le portefeuille n’est pas forcément d’accord, les goûts, eux, ne changent jamais ! Je te souhaite donc beaucoup d’argent, parce qu’il va t’en falloir pour satisfaire toutes tes envies ! Et côté amour, je te souhaite beaucoup de bonheur… Peut-être bien que cette année sera celle où tu deviendras la deuxième épouse de quelqu’un ! 😉

Plus sérieusement, je te souhaite une année remplie de bonheur, de santé, d’amour, de réussite et de belles opportunités. Que Dieu veille sur toi, protège tes projets et t’accorde tout ce que ton cœur désire. Reste cette fille gentille, généreuse, souriante et pleine de vie. Ne change pas !

Au-delà de toutes mes petites taquineries, sache que je suis vraiment contente de t’avoir dans mon entourage. Tu es une belle rencontre et j’espère qu’on aura encore plein d’occasions de partager de bons moments, de rire pour rien et de créer de jolis souvenirs ensemble. Continue de profiter de la vie, de rêver grand et surtout de rester cette Amina bien bête qu’on connaît et qu’on apprécie.

Joyeux anniversaire encore, ma belle NICKYYYYYYY ! LOVE YOU SO MUCH MY LOVE !
CHAAAARRRGGGGÉEEEEEEE ! ✨`
  },
  {
    id: 27,
    name: 'Christine Coly',
    title: 'Christine Coly',
    message: `Christine Coly pour Amina,
À une personne au grand cœur.

Si je devais définir notre relation en quelques mots, je dirais que tu es une très belle personne que la vie a mise sur mon chemin. Je t’ai connue à travers ma cousine, et depuis, j’ai découvert une personne exceptionnelle, avec un cœur immense.

Tu fais partie de ces personnes rares qui donnent sans compter, qui partagent ce qu’elles ont et qui sont toujours prêtes à être là pour les autres. Ta générosité envers moi m’a toujours touchée. Tu es douce, gentille, à l’écoute et tu as toujours un conseil à donner, même pour les plus petites choses. Tu sais trouver les mots pour réconforter, rassurer et aider les personnes autour de toi.

Ce que j’apprécie particulièrement chez toi, c’est ta façon d’aimer les gens, d’être présente pour tes amies et de donner de ton temps sans forcément attendre quelque chose en retour. Tu as cette bonté naturelle qui fait du bien et qui te rend si spéciale.

En ce jour si particulier, je veux simplement te rappeler à quel point tu es une belle personne et combien tu mérites de recevoir tout l’amour et toute la gentillesse que tu offres aux autres. Que Dieu te garde, protège ton grand cœur et t’accorde tout le bonheur que tu mérites. Qu’Il te donne une vie remplie de paix, de santé, de réussite et de belles surprises.

Joyeux anniversaire à toi, une personne aussi douce que précieuse. Ne change jamais cette belle âme que tu es. Je suis reconnaissante de te connaître et j’espère que la vie nous permettra de partager encore beaucoup de beaux moments ensemble.`
  },
  {
    id: 28,
    name: 'Romaric',
    title: 'Romaric',
    message: `Lettre à Amina : Joyeux anniversaire Barre Faty !

Je t’écris pour te souhaiter un joyeux anniversaire et aussi te transmettre toute mon affection.

Je ne te connais que depuis cette année et pourtant je me sens à l’aise avec toi comme si je te connaissais depuis longtemps. Tu es vraie et cela se voit avec ta manière de te comporter avec les gens, et c’est cela qui m’a le plus marqué chez toi.

Je te souhaite le meilleur, surtout la santé et le courage de continuer. C’est de ça que tu as vraiment besoin et le reste suivra. Vis bien et longtemps pour qu’on puisse encore partager des moments ensemble.

Je t’aime fort,
ROMARIC`
  },
  {
    id: 29,
    name: 'Papy Chulo',
    title: 'Papy Chulo',
    message: `Joyeux anniversaire ma Amina !

Je ne vais pas te faire un long discours, mais je voulais simplement te souhaiter le meilleur, parce que tu le mérites vraiment.

Que Dieu te garde, te protège et fasse briller ta vie de mille belles choses. Je te souhaite de réaliser tout ce qui te tient à cœur et de toujours garder ce beau sourire. Profite bien de ta journée ma belle, je t’envoie plein de bisous.

N'oublie pas de me réserver une part du gâteau ! 🎂

Avec toute mon affection, de la part de Papi Chulo, ton meilleur pote garçon`
  },
  {
    id: 30,
    name: 'Awa Ndiaye',
    title: 'Awa Ndiaye',
    message: `Joyeux anniversaire jumelle !!!

Lima la yenei beuri na sa makk là nous sommes des soeurs raw na andado. Dou ma fi nekk di deff lettre bou goudou nakhté diarouko.

Yenei bi ak niane yi doy na seuk ak barkei. Borom bi sam la arr la leep doli ba lo beug mou yomb la.

Long life to you, Queen twin love you so so so much !

Ta jumelle, ta soeur,
Celle que tu casses les couilles le plus 😂
Awouch ❤️ EVE`
  },
  {
    id: 31,
    name: 'Coumbis',
    title: 'Coumbis',
    message: `❤️ Joyeux anniversaire Aminata Faty ! ❤️

En ce jour si spécial, je te souhaite tout le bonheur du monde. Que Dieu t’accorde une longue vie, une excellente santé, beaucoup de réussite et surtout qu’Il réalise tous les souhaits de ton cœur.

Profite pleinement de ta journée, souris, sois heureuse et n’oublie jamais à quel point tu es précieuse. Que cette nouvelle année de ta vie soit remplie de belles surprises, d’amour, de paix et de bénédictions.

Je te souhaite le meilleur aujourd’hui et pour toujours. ❤️

Avec beaucoup d’affection, de la part de Coumbiss. 💕`
  },
  {
    id: 32,
    name: 'Mbaye Ndiaye',
    title: 'Mbaye Ndiaye',
    message: `Le 03 Août 2025, je me souviens bien. C’était la première fois qu’on avait échangé.

Ce fut un jour où j’étais stupéfait de savoir que j’ai en face de moi une personne vraiment, non mais vraiment drôle et espiègle. J’ai tout de suite vu en toi ma complice et en même pas un mois nous nous sommes familiarisés et nous avons passé de très bons moments ensemble.

Durant ce moment, j’ai également pu découvrir la belle personne que tu es à l’intérieur aussi bien pour ta famille mais aussi tes amis. Très résiliente et brave, tu fais toujours face aux difficultés sans même sonner la sonnette d’alarme. Tu as toujours eu le temps pour qui que ce soit d’écouter ses peines et de l’assister. Quand je te vois avec tes frères et sœurs, je vois une mère et ses enfants, toujours aux petits soins.

Continue de vivre, continue de briller et de faire briller tous ceux que tu aimes. Aie toujours cette joie de vivre et continue de la répandre. Que Dieu te rapproche de lui, t’accorde une longue vie et une santé de fer.

Joyeux anniversaire Aminata Faty ❤️`
  },
  {
    id: 33,
    name: 'Absa',
    title: 'Absa',
    message: `Joyeux anniversaire notre Nicky !

Je te souhaite tout le bonheur du monde, santé, prospérité.

Leppp lo beug yalla nalako yalla defaral. Passe une très bonne journée !

Bisouuuuuu ❤️`
  },
  {
    id: 34,
    name: 'Maty Smith',
    title: 'Maty Smith',
    message: `Happy Birthday, peppa pig ! ❤️🎂

Franchement, tu fais partie de mes plus belles rencontres d’enfance. T’es vraiment une belle personne et je te souhaite tout le bonheur du monde.

J’aime beaucoup la sincérité qu’il y a toujours eu entre nous, sans prise de tête ni négativité. C’est rare et ça fait plaisir d’avoir une personne comme toi dans sa vie.

J’espère vraiment qu’on gardera cette belle amitié encore très longtemps, jusqu’à voir nos enfants grandir ensemble, inchaAllah.

Je te souhaite plein de bonheur, d’amour, de réussite et surtout une très longue vie. Reste comme tu es, ne change pas !

Love youuu so muchhh 💕`
  },
  {
    id: 35,
    name: 'Coumba Aïcha',
    title: 'Coumba Aïcha',
    message: `Je ne sais pas si je trouverai un jour les mots assez forts pour exprimer tout l’amour que j’ai pour toi parce qu’au delà du lien qui nous unit tu représentes une partie de ma vie que je ne pourrais jamais remplacer.

Tu es ma sœur, et ce mot à lui seul porte tellement de choses 🥹 des souvenirs, des fous rires, des confidences, des moments de joie... Et malgré tout, il y a cette chose qui ne changera jamais et c’est le lien qui nous unit.

Je ne sais pas si je trouverai un jour les mots assez forts pour exprimer tout l’amour que j’ai pour toi.

Je t’aime énormément et ça ne changera jamais.

Longue vie à nous sis 🫶🏾 be happy`
  },
  {
    id: 36,
    name: 'Mimi',
    title: 'Mimi',
    message: `Joyeux anniversaire à ma très chère fille Amina Faty ! 🥰❤️

En ce jour si spécial, je prie Dieu de t’accorder une longue vie, une santé de fer, beaucoup de bonheur et une réussite sans limite.

Que chacun de tes rêves devienne réalité et que ton chemin soit toujours éclairé par la joie, l’amour et la bénédiction divine. Sache que tu es une personne précieuse et que je te souhaite tout ce qu’il y a de meilleur dans cette vie.

Continue de briller, de sourire et de garder ce magnifique cœur. Que cette nouvelle année soit remplie de belles surprises et de grâce !

Je t’aime énormément ma princesse. Profite pleinement de ta journée !

Joyeux anniversaire encore Amina Faty 😍🥰❤️`
  },
];

interface VoiceNotePlayerProps {
  audioSrc: string;
  senderName: string;
}

const VoiceNotePlayer: React.FC<VoiceNotePlayerProps> = ({ audioSrc, senderName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      window.dispatchEvent(new CustomEvent('birthday-resume-music'));
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      // Toujours reprendre la musique si on ferme le modal
      window.dispatchEvent(new CustomEvent('birthday-resume-music'));
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      window.dispatchEvent(new CustomEvent('birthday-resume-music'));
    } else {
      window.dispatchEvent(new CustomEvent('birthday-pause-music'));
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const time = Number(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (secs: number) => {
    if (!secs || isNaN(secs) || !isFinite(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full my-2 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-rose-950/60 via-purple-950/40 to-pink-950/60 border border-rose-400/40 shadow-[0_0_20px_rgba(244,114,182,0.2)] backdrop-blur-md">
      <audio ref={audioRef} src={audioSrc} preload="metadata" />

      <div className="flex items-center gap-2.5 sm:gap-3.5">
        {/* Bouton Play / Pause compact avec lueur rose */}
        <button
          onClick={togglePlay}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white" />
          ) : (
            <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5 fill-white text-white" />
          )}
        </button>

        {/* Visualisation onde sonore & scrubber */}
        <div className="flex-1 flex flex-col justify-center gap-1">
          <div className="flex items-center justify-between text-xs text-rose-200/90 font-mono">
            <span className="flex items-center gap-1.5 text-[11px] sm:text-xs">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-rose-400'}`} />
              Note vocale de <strong className="text-white font-serif-luxury">{senderName}</strong>
            </span>
            <span className="font-semibold text-rose-300 text-[11px] sm:text-xs">
              {formatTime(currentTime)} {duration > 0 && `/ ${formatTime(duration)}`}
            </span>
          </div>

          {/* Barres d'ondes audio animées style WhatsApp */}
          <div className="flex items-center gap-1 h-5 py-0.5">
            {Array.from({ length: 24 }).map((_, i) => {
              const barProgress = (i / 24) * 100;
              const isPassed = barProgress <= progress;
              const heightMultiplier = [40, 70, 30, 90, 60, 100, 45, 80, 55, 95, 35, 75, 50, 85, 65, 40, 90, 55, 70, 45, 80, 60, 35, 65][i % 24];
              return (
                <div
                  key={i}
                  className={`flex-1 rounded-full transition-all duration-150 ${
                    isPassed ? 'bg-rose-400 shadow-[0_0_6px_rgba(244,114,182,0.8)]' : 'bg-white/20'
                  } ${isPlaying ? 'animate-pulse' : ''}`}
                  style={{
                    height: `${heightMultiplier}%`,
                    animationDelay: `${(i % 5) * 0.12}s`,
                  }}
                />
              );
            })}
          </div>

          {/* Curseur seek tactile fluide */}
          <input
            type="range"
            min="0"
            max={duration || 1}
            step="0.05"
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 accent-rose-400 bg-white/10 rounded-lg appearance-none cursor-pointer mt-0.5"
          />
        </div>
      </div>
    </div>
  );
};

interface TypewriterMessageProps {
  gift: GiftItem;
  onClose: () => void;
}

const TypewriterMessage: React.FC<TypewriterMessageProps> = ({ gift, onClose }) => {
  const [displayedChars, setDisplayedChars] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isUserScrolledUp = useRef(false);

  // Verrouiller tout défilement de la page entière en arrière-plan
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    setDisplayedChars(0);
    isUserScrolledUp.current = false;
    if (!gift.message) return;

    // Vitesse douce et rythmée : 1 lettre à la fois
    const isLong = gift.message.length > 400;
    const intervalMs = isLong ? 28 : 45;

    const interval = setInterval(() => {
      setDisplayedChars((prev) => {
        if (prev >= gift.message.length) {
          clearInterval(interval);
          return gift.message.length;
        }
        return prev + 1;
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [gift]);

  // Détection du scroll manuel : si l'utilisateur scrolle vers le haut pour relire, on n'interrompt pas sa lecture
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    isUserScrolledUp.current = scrollHeight - scrollTop - clientHeight > 40;
  };

  const isTyping = displayedChars < gift.message.length;
  const isLongLetter = gift.message.length > 220;
  const currentText = gift.message.slice(0, displayedChars);
  const paragraphs = currentText.split('\n\n');
  const fullParagraphs = gift.message.split('\n\n');

  // Défilement automatique doux uniquement pour les très longues lettres de lecture
  useEffect(() => {
    if (scrollRef.current && !isUserScrolledUp.current && isLongLetter && !gift.audio) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedChars, isLongLetter, gift.audio]);

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0d070e]/95 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 overflow-hidden select-text"
      onClick={onClose}
    >
      {/* Étoiles scintillantes en arrière-plan comme sur la photo */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 32 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: `${(i * 17) % 100}%`,
              left: `${(i * 23) % 100}%`,
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              opacity: (i % 5) * 0.18 + 0.25,
              animationDuration: `${1.6 + (i % 4) * 0.6}s`,
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.9)'
            }}
          />
        ))}
      </div>

      {/* Titre "Happy Birthday" éclatant au-dessus */}
      <div className="relative z-10 text-center mb-3 sm:mb-6 lg:mb-8 animate-in slide-in-from-top-4 duration-700 shrink-0">
        <h2 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl italic font-normal text-white tracking-wide drop-shadow-[0_0_25px_rgba(255,255,255,0.8)] drop-shadow-[0_0_60px_rgba(244,114,182,0.45)]">
          Happy Birthday
        </h2>
      </div>

      {/* Carte en verre dépoli (Frosted Glassmorphism) aux proportions adaptées selon la taille de l'écran */}
      <div
        className="relative z-10 max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl w-full bg-white/[0.04] backdrop-blur-2xl border border-white/15 rounded-2xl sm:rounded-3xl lg:rounded-[36px] p-5 sm:p-8 lg:p-10 xl:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.7)] flex flex-col h-[85vh] sm:h-[82vh] lg:h-[78vh] xl:h-[75vh] max-h-[920px] animate-in zoom-in-95 duration-500 text-left"
        onClick={(e) => {
          e.stopPropagation();
          if (isTyping) {
            setDisplayedChars(gift.message.length);
          }
        }}
      >
        {/* Guillemet décoratif en haut à gauche */}
        <div className="text-white/30 text-2xl sm:text-3xl lg:text-4xl font-serif leading-none mb-2 lg:mb-3 select-none shrink-0">
          ❝
        </div>

        {/* En-tête avec titre et badge élégant pour l'expéditeur */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 border-b border-white/10 pb-3 sm:pb-4 mb-3 sm:mb-5 shrink-0">
          <span className="text-xs sm:text-sm lg:text-base font-mono tracking-[0.22em] uppercase text-rose-200 font-semibold drop-shadow-sm">
            HAPPY BIRTHDAY AMINA 🤍
          </span>

          {/* Badge élégant pour l'expéditeur */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 lg:px-5 py-1 sm:py-1.5 lg:py-2 rounded-full bg-gradient-to-r from-rose-500/25 via-pink-500/20 to-rose-400/15 border border-rose-300/40 text-rose-100 text-xs sm:text-sm shadow-[0_0_15px_rgba(244,114,182,0.25)] self-start sm:self-auto backdrop-blur-sm">
            <span className="text-amber-300 text-xs sm:text-sm"></span>
            <span className="text-rose-200/80 font-sans text-[11px] sm:text-xs lg:text-sm uppercase tracking-wider">De la part de</span>
            <strong className="text-white font-semibold font-serif-luxury tracking-wide text-xs sm:text-sm lg:text-base">{gift.name}</strong>
          </div>
        </div>

        {/* Zone de lecture avec mise en page soignée pour longues lettres, messages audio et messages courts */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto pr-2 sm:pr-4 lg:pr-6 luxury-scrollbar scroll-smooth flex flex-col"
        >
          {gift.audio ? (
            /* Mise en page dédiée pour message avec note vocale : lecteur en tête puis texte complet en dessous sans débordement */
            <div className="flex-1 flex flex-col items-center justify-start text-center px-2 sm:px-4 py-1 sm:py-2 w-full max-w-xl mx-auto space-y-3">
              {/* Le lecteur de note vocale compact */}
              <div className="w-full shrink-0">
                <VoiceNotePlayer audioSrc={gift.audio} senderName={gift.name} />
              </div>

              {/* Texte complet de la note vocale rendu lisible et compact */}
              <div className="space-y-2.5 w-full">
                {paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className="font-serif-luxury text-sm sm:text-base lg:text-lg text-rose-100/95 leading-relaxed italic drop-shadow-sm px-2"
                  >
                    {p}
                    {idx === paragraphs.length - 1 && isTyping && (
                      <span className="inline-block w-1.5 sm:w-2 h-3.5 sm:h-4 bg-rose-200 animate-pulse ml-1 align-middle shadow-[0_0_8px_rgba(255,255,255,0.85)]" />
                    )}
                  </p>
                ))}
              </div>

              <div className="pt-1.5 flex items-center gap-2 text-[11px] sm:text-xs font-mono tracking-widest uppercase text-rose-300/75">
                <span>— Avec tout mon amour —</span>
              </div>
            </div>
          ) : isLongLetter ? (
            /* Mise en page style lettre manuscrite élégante */
            <div className="space-y-4 lg:space-y-6 text-rose-50/95 font-sans pb-4 select-none">
              {paragraphs.map((p, idx) => {
                const isCurrentParagraph = idx === paragraphs.length - 1;
                const cursor = isCurrentParagraph && isTyping ? (
                  <span className="inline-block w-2 sm:w-2.5 h-4 sm:h-5 lg:h-6 bg-rose-200 animate-pulse ml-1 align-middle shadow-[0_0_8px_rgba(255,255,255,0.85)]" />
                ) : null;

                const fullP = fullParagraphs[idx] || '';
                const isFinalLetterParagraph = idx === fullParagraphs.length - 1;

                // Entête ou salutation d'ouverture (sur le 1er paragraphe de la lettre)
                const isFirstHeader =
                  idx === 0 &&
                  (fullP.startsWith('À ') ||
                    fullP.startsWith('À TOI') ||
                    fullP.startsWith('Chère ') ||
                    fullP.startsWith('To my lovely') ||
                    fullP.startsWith('Joyeux anniversaire') ||
                    fullP.startsWith('Happy Birthday') ||
                    fullP.startsWith('Happy birthday') ||
                    fullP.startsWith('Heureuse fête') ||
                    fullP.startsWith('Mon amour') ||
                    fullP.startsWith('En ce jour si spécial') ||
                    fullP.startsWith('Lettre à Amina') ||
                    fullP.startsWith('Christine Coly') ||
                    fullP.startsWith('Le 03 Août') ||
                    fullP.startsWith('❤️') ||
                    fullP.startsWith('Amina,') ||
                    fullP.startsWith('Amina Faty,'));

                if (isFirstHeader) {
                  return (
                    <div key={idx} className="font-serif-luxury text-base sm:text-lg lg:text-xl xl:text-2xl italic text-rose-200 tracking-wide pb-2 lg:pb-3 border-b border-rose-400/20 mb-3 lg:mb-4 text-left">
                      {p}
                      {cursor}
                    </div>
                  );
                }

                // Salutation d'ouverture en 2e paragraphe (ex: "Ma chérie,")
                if (idx === 1 && (fullP.includes('chérie') || fullP.includes('Meena,'))) {
                  return (
                    <div key={idx} className="font-serif-luxury text-lg sm:text-xl lg:text-2xl font-medium text-rose-100 pb-1 text-left">
                      {p}
                      {cursor}
                    </div>
                  );
                }

                // Signature finale : UNIQUEMENT pour le tout dernier paragraphe de la lettre complète
                const isSignature = isFinalLetterParagraph && (
                  fullP.includes('Ta maman') ||
                  fullP.includes('Ton petit frère') ||
                  fullP.includes('Ta petite sœur') ||
                  fullP.includes('Moussa Faty') ||
                  fullP.includes('Awa Faty') ||
                  fullP.includes('Pape Babacar') ||
                  fullP.includes('Gina.') ||
                  fullP.includes('PAYE') ||
                  fullP.includes('Kadeza') ||
                  fullP.includes('ROMARIC') ||
                  fullP.includes('Papi Chulo') ||
                  fullP.includes('Coumbiss') ||
                  fullP.includes('Coumba') ||
                  fullP.includes('Mimi') ||
                  fullP.includes('Maty') ||
                  fullP.includes('Absa') ||
                  fullP.includes('Awouch') ||
                  fullP.startsWith('Avec') ||
                  fullP.startsWith('Ton ') ||
                  fullP.startsWith('Ta ') ||
                  fullP.startsWith('Love') ||
                  fullP.startsWith('Je t’aime') ||
                  fullP.startsWith("Je t'aime") ||
                  fullP.startsWith('Happy Birthday encore') ||
                  fullP.length < 90
                );

                if (isSignature) {
                  return (
                    <div key={idx} className="pt-4 lg:pt-6 text-right font-serif-luxury italic text-rose-200 text-sm sm:text-base lg:text-lg xl:text-xl border-t border-white/10 mt-5 lg:mt-6 whitespace-pre-line">
                      <span className="text-amber-300 mr-2 text-xs sm:text-sm">✨</span>
                      <span className="font-medium text-white">{p}</span>
                      {cursor}
                    </div>
                  );
                }

                // Phrase d'amour ou vœu fort en avant-dernière position (si connue d'avance dans fullP)
                if (
                  fullP.startsWith('Je t’aime d’un amour') ||
                  fullP.startsWith("Je t'aime d'un amour") ||
                  fullP.startsWith('Je suis heureux de t’avoir') ||
                  fullP.startsWith('Qu’ الله SWT fasse que nous nous retrouvions')
                ) {
                  return (
                    <div key={idx} className="pt-2 lg:pt-3 text-right font-serif-luxury italic text-rose-100 font-semibold text-base sm:text-lg lg:text-xl">
                      {p}
                      {cursor}
                    </div>
                  );
                }

                // Paragraphes de corps : toujours strictement à gauche
                return (
                  <p key={idx} className="text-[15px] sm:text-base lg:text-lg xl:text-xl leading-[1.85] lg:leading-[2] xl:leading-[2.1] font-light text-rose-50/95 tracking-wide text-left mb-3.5 lg:mb-5">
                    {p}
                    {cursor}
                  </p>
                );
              })}
            </div>
          ) : (
            /* Mise en page style carte de vœux luxueuse pour messages courts */
            <div className="m-auto flex flex-col items-center justify-center text-center px-3 py-3 sm:py-5 w-full">
              <div className="relative max-w-xl lg:max-w-2xl mx-auto">
                <span className="text-rose-300/20 text-4xl sm:text-5xl font-serif absolute -top-5 sm:-top-7 -left-2 sm:-left-4 select-none pointer-events-none">“</span>
                <p className="font-serif-luxury text-base sm:text-xl lg:text-2xl text-rose-50 leading-relaxed italic drop-shadow-sm px-4 lg:px-6">
                  {currentText}
                  {isTyping && (
                    <span className="inline-block w-2 sm:w-2.5 h-4 sm:h-5 bg-rose-200 animate-pulse ml-1 align-middle shadow-[0_0_8px_rgba(255,255,255,0.85)]" />
                  )}
                </p>
                <span className="text-rose-300/20 text-4xl sm:text-5xl font-serif absolute -bottom-6 sm:-bottom-8 -right-2 sm:-right-4 select-none pointer-events-none">”</span>
              </div>
              <div className="pt-4 sm:pt-6 flex items-center gap-2 text-xs sm:text-sm font-mono tracking-widest uppercase text-rose-300/75">
                <span>— Avec tout mon amour —</span>
              </div>
            </div>
          )}
        </div>

        {/* Bouton rose pill "RETOUR AUX CADEAUX →" qui apparaît une fois le texte fini d'écrire */}
        {!isTyping && (
          <div className="pt-3 sm:pt-4 lg:pt-6 mt-2 border-t border-white/10 flex justify-center animate-in fade-in zoom-in-95 duration-500 shrink-0">
            <button
              onClick={onClose}
              className="group inline-flex items-center justify-center gap-2.5 px-7 sm:px-10 lg:px-12 py-2.5 sm:py-3.5 lg:py-4 rounded-full bg-[#f0859a] hover:bg-[#e87087] active:scale-95 text-white font-semibold text-xs sm:text-sm lg:text-base tracking-[0.2em] uppercase shadow-[0_0_25px_rgba(240,133,154,0.65)] hover:shadow-[0_0_35px_rgba(240,133,154,0.9)] transition-all duration-300 cursor-pointer"
            >
              <span>RETOUR AUX CADEAUX</span>
              <span className="group-hover:translate-x-1.5 transition-transform">→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const STORAGE_KEY = 'meena_birthday_opened_gifts';

export const ThirtyGiftsScreen: React.FC<ThirtyGiftsScreenProps> = ({ onGoToOurMemory }) => {
  const [openedGifts, setOpenedGifts] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });
  const [activeGiftModal, setActiveGiftModal] = useState<GiftItem | null>(null);

  const handleOpenBox = (gift: GiftItem) => {
    if (!openedGifts.includes(gift.id)) {
      const nextOpened = [...openedGifts, gift.id];
      setOpenedGifts(nextOpened);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextOpened));
      } catch {
        // ignore
      }

      // Si tous les cadeaux viennent d'être ouverts, lancer un feu d'artifice de confettis
      if (nextOpened.length === GIFTS_LIST.length) {
        setTimeout(() => {
          confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.6 }
          });
        }, 400);
      }
    }
    setActiveGiftModal(gift);

    confetti({
      particleCount: 70,
      spread: 65,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="relative min-h-screen w-full bg-[#171018] text-[#f7eef2] flex flex-col items-center justify-start p-4 sm:p-8 overflow-x-hidden select-none font-sans">
      {/* Background radial ambiance */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#38202d] via-[#1c121b] to-[#0d090d] pointer-events-none" />

      {/* Halo lumineux fluide zéro-coût GPU optimisé Safari */}
      <div
        className="fixed top-1/4 left-1/3 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(244, 63, 94, 0.12) 0%, transparent 70%)' }}
      />
      <div
        className="fixed bottom-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)' }}
      />

      {/* Pétales de rose réalistes flottants */}
      <FallingPetals count={16} />

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl xl:max-w-7xl 2xl:max-w-[1500px] w-full text-center space-y-6 sm:space-y-8 lg:space-y-10 pt-12 sm:pt-16 pb-20 animate-in fade-in zoom-in-95 duration-700">

        {/* Top Tagline */}
        <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs lg:text-sm tracking-[0.28em] uppercase text-rose-200/80 font-medium">
          <span className="text-rose-300">✦</span>
          <span>{GIFTS_LIST.length} CADEAUX POUR TON ANNIVERSAIRE</span>
          <span className="text-rose-300">✦</span>
        </div>

        {/* Subtitle with stars */}
        <p className="font-serif-luxury text-sm sm:text-base md:text-lg lg:text-xl italic text-rose-200/90 tracking-wide flex items-center justify-center gap-2">
          <span className="text-amber-300">✨</span>
          <span>Clique sur une boîte pour découvrir le cadeau de tes proches</span>
          <span className="text-amber-300">✨</span>
        </p>

        {/* Progression des cadeaux */}
        <div className="flex items-center justify-center gap-3 text-xs sm:text-sm lg:text-base text-rose-200/70 pt-1">
          <span className="bg-white/[0.04] px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border border-white/10 backdrop-blur-xs">
            Cadeaux ouverts : <strong className="text-rose-300 font-mono">{openedGifts.length} / {GIFTS_LIST.length}</strong> 🎁
          </span>
        </div>

        {/* 30 Glowing Gift Boxes Grid aux proportions dynamiques selon l'écran */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7 pt-4 sm:pt-6">
          {GIFTS_LIST.map((gift) => {
            const isOpened = openedGifts.includes(gift.id);
            return (
              <div
                key={gift.id}
                onClick={() => handleOpenBox(gift)}
                className={`relative group cursor-pointer p-2.5 sm:p-3.5 md:p-4 lg:p-5 xl:p-6 rounded-2xl lg:rounded-3xl flex flex-col items-center justify-center transition-all duration-300 ${isOpened
                  ? 'bg-rose-950/40 border border-rose-500/40 shadow-md shadow-rose-500/10'
                  : 'bg-white/[0.03] hover:bg-white/[0.08] border border-white/15 hover:border-rose-400/60 hover:scale-105 hover:shadow-xl hover:shadow-rose-500/20'
                  }`}
              >
                {/* Badge audio si le cadeau contient un message vocal */}
                {gift.audio && (
                  <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-20 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-rose-500/35 border border-rose-300/40 text-[9px] sm:text-[10px] text-rose-100 shadow-[0_0_10px_rgba(244,114,182,0.4)] backdrop-blur-xs font-mono">
                    <Mic className="w-2.5 h-2.5 text-rose-300" />
                    <span>Vocal</span>
                  </span>
                )}

                {/* Visual Gift Box matching the design */}
                <div className="relative w-14 sm:w-16 md:w-20 lg:w-24 xl:w-28 h-14 sm:h-16 md:h-20 lg:h-24 xl:h-28 flex items-center justify-center mb-2 lg:mb-3">
                  {/* Glowing bow on top */}
                  <div className="absolute -top-1 lg:-top-1.5 left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                    <div className="w-4 sm:w-5 lg:w-6 xl:w-7 h-2 sm:h-2.5 lg:h-3 xl:h-3.5 rounded-full border border-rose-300/80 bg-rose-400/40 -mr-1 transform -rotate-12 shadow-[0_0_8px_rgba(244,114,182,0.6)]" />
                    <div className="w-4 sm:w-5 lg:w-6 xl:w-7 h-2 sm:h-2.5 lg:h-3 xl:h-3.5 rounded-full border border-rose-300/80 bg-rose-400/40 -ml-1 transform rotate-12 shadow-[0_0_8px_rgba(244,114,182,0.6)]" />
                  </div>

                  {/* Gift Box Container */}
                  <div
                    className={`w-12 sm:w-14 md:w-16 lg:w-20 xl:w-24 h-11 sm:h-12 md:h-15 lg:h-18 xl:h-20 rounded-lg lg:rounded-xl relative overflow-hidden transition-all flex items-center justify-center ${isOpened
                      ? 'border border-rose-400/50 bg-rose-500/20'
                      : 'border border-rose-300/40 bg-white/[0.04] shadow-[0_0_15px_rgba(244,114,182,0.15)] group-hover:border-rose-300/80 group-hover:shadow-[0_0_20px_rgba(244,114,182,0.4)]'
                      }`}
                  >
                    {/* Vertical Ribbon */}
                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-2 sm:w-2.5 lg:w-3 xl:w-3.5 bg-rose-300/30 border-x border-rose-200/30" />

                    {/* Horizontal Ribbon */}
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-2 sm:h-2.5 lg:h-3 xl:h-3.5 bg-rose-300/30 border-y border-rose-200/30" />

                    {/* Box Number in center */}
                    <span className="relative z-10 font-serif-luxury font-bold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-rose-100 drop-shadow-sm">
                      {isOpened ? '✓' : gift.id}
                    </span>
                  </div>
                </div>

                {/* Box Label: Person Name */}
                <span className="text-[10px] sm:text-xs md:text-sm lg:text-base font-medium tracking-wide text-rose-100/90 group-hover:text-white transition-colors truncate max-w-full px-1 text-center">
                  {gift.name}
                </span>

                {isOpened && (
                  <span className="text-[9px] sm:text-[10px] lg:text-xs text-rose-300/80 font-sans mt-0.5">
                    Ouvert ♡
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Bouton Our Memory (apparaît UNIQUEMENT quand les 30 cadeaux ont tous été ouverts) */}
        {openedGifts.length === GIFTS_LIST.length && onGoToOurMemory && (
          <div className="pt-10 sm:pt-14 pb-4 flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="mb-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-100 text-xs sm:text-sm font-medium shadow-[0_0_25px_rgba(244,114,182,0.35)] backdrop-blur-sm animate-pulse">
              <span className="text-amber-300">✨</span>
              <span>Tous les cadeaux ont été ouverts ! Une dernière surprise t'attend</span>
              <span className="text-amber-300">✨</span>
            </div>

            <button
              onClick={onGoToOurMemory}
              className="group inline-flex items-center justify-center gap-3 px-10 sm:px-14 py-3.5 sm:py-4.5 rounded-full bg-[#f0859a] hover:bg-[#e87087] active:scale-95 text-white font-semibold text-xs sm:text-sm lg:text-base tracking-[0.22em] uppercase shadow-[0_0_30px_rgba(240,133,154,0.7)] hover:shadow-[0_0_45px_rgba(240,133,154,0.95)] hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <span>Our Memory</span>
              <span className="group-hover:translate-x-1.5 transition-transform text-base lg:text-lg">→</span>
            </button>
          </div>
        )}

        {/* Modal when a gift box is opened - Style identical to user's photo with Typewriter effect */}
        {activeGiftModal && (
          <TypewriterMessage
            gift={activeGiftModal}
            onClose={() => setActiveGiftModal(null)}
          />
        )}

      </div>
    </div>
  );
};
