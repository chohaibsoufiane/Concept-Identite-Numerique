from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_CELL_VERTICAL_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

OUT = r'C:\Users\lufylon\Documents\antigravity\gallant-galileo\guide_comprendre_identite_numerique.docx'
doc = Document()
sec = doc.sections[0]
sec.top_margin = Inches(.7)
sec.bottom_margin = Inches(.7)
sec.left_margin = Inches(.8)
sec.right_margin = Inches(.8)

styles = doc.styles
styles['Normal'].font.name = 'Arial'
styles['Normal'].font.size = Pt(10.5)
styles['Normal'].paragraph_format.space_after = Pt(5)
for style_name, size, color in [('Title', 25, '17324D'), ('Heading 1', 17, '17324D'), ('Heading 2', 12, '176B72')]:
    st = styles[style_name]
    st.font.name = 'Arial'
    st.font.size = Pt(size)
    st.font.bold = True
    st.font.color.rgb = RGBColor.from_string(color)

title = doc.add_paragraph(style='Title')
title.add_run('Comprendre l’identité numérique')
p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.LEFT
r = p.add_run('Guide de leçon pour préparer une présentation à six intervenants')
r.italic = True
r.font.color.rgb = RGBColor(90, 100, 110)

doc.add_paragraph(
    'Cette leçon explique comment se forme une identité numérique, comment les autres peuvent se faire une impression à partir des traces en ligne, et quels gestes aident à protéger ses comptes. Le fil commence par le concept de l’iceberg. Il suit ensuite les six intervenants : le présentateur principal, Mhaitate, Mekkaoui, Rayane, Badaoui et Bouazizi. Certains reviennent à plusieurs moments pour garder un ordre pédagogique clair.'
)

doc.add_heading('L’idée générale en une minute', level=1)
doc.add_paragraph(
    'Notre identité numérique est l’ensemble des informations et des traces qui nous représentent en ligne. Une partie vient de ce que nous choisissons de dire et de montrer. Une autre vient de nos actions. Des plateformes peuvent aussi interpréter ces activités et en tirer des conclusions. Les personnes qui voient certaines informations peuvent alors se faire une impression de nous : c’est lié à notre e-réputation. Cette impression n’est pas toujours celle que nous voulions donner.'
)

doc.add_heading('Le plan de la leçon et les intervenants', level=1)
parts = [
('0. Entrée en matière — Qu’est-ce que l’identité ?',
 'L’identité en général désigne l’ensemble des caractéristiques physiques, civiles (nom, prénom, date de naissance) et sociales qui rendent un individu unique et reconnaissable dans le temps. Elle existe à travers deux regards indissociables : la conscience de soi et la reconnaissance par autrui. Dans l’espace numérique, le corps physique disparaît : nous sommes représentés par des comptes, des pseudonymes et des données dématérialisées.',
 'À comprendre : l’identité numérique n’est pas un simple profil statique. Elle disperse la personne à travers de multiples services et substitue des traces à la présence physique.',
 'Transition : « Pour comprendre comment cette identité numérique fonctionne sous la surface, utilisons la métaphore de l’iceberg. »'),
('1. Présentateur principal — commencer par l’iceberg',
 'Présenter l’iceberg comme une image pour comprendre l’identité numérique. La partie visible représente les informations faciles à trouver ou que la personne choisit d’afficher. La partie sous l’eau représente d’autres activités et traces, dont la visibilité varie. L’iceberg aide à organiser les idées ; il ne signifie pas que tout ce qui est sous l’eau est secret.',
 'À expliquer : une action peut être publique, privée ou accessible seulement à la plateforme. Le public extérieur ne voit pas automatiquement toutes les données détenues par une plateforme.',
 'Transition : « Pour comprendre ce qui compose cet iceberg, regardons d’abord ce qu’une personne choisit elle-même de montrer. »'),
('2. Mhaitate — l’identité déclarative',
 'L’identité déclarative rassemble les informations qu’une personne donne volontairement sur elle-même : nom ou pseudonyme, photo, biographie, centres d’intérêt affichés et publications choisies. Ces éléments construisent une présentation de soi.',
 'À comprendre : ce contenu ne représente qu’une partie de l’identité numérique. Une personne peut choisir ce qu’elle publie, mais les réglages de confidentialité déterminent aussi qui peut le voir.',
 'Transition : « Le profil montre ce que la personne choisit de partager. Il ne montre pas toutes les actions qu’elle fait en ligne. »'),
('3. Mekkaoui — l’identité agissante et les traces',
 'L’identité agissante vient des activités en ligne : publier, commenter, aimer, partager, rechercher, regarder une vidéo ou consulter une page. Ces actions peuvent laisser des traces. Certaines sont visibles par d’autres personnes ; d’autres sont enregistrées par le service utilisé.',
 'À comprendre : une trace n’est pas toujours publique. Il faut distinguer ce que voient les autres utilisateurs de ce que la plateforme peut enregistrer dans ses propres systèmes. Éviter de présenter toute activité comme cachée ou accessible à tout le monde.',
 'Transition : « Une plateforme peut analyser certaines activités et essayer d’en tirer des conclusions. »'),
('4. Présentateur principal — l’identité calculée',
 'L’identité calculée désigne les catégories ou les conclusions qu’un service peut déduire à partir de données et d’activités. Par exemple, après plusieurs consultations sur un même thème, une plateforme peut supposer qu’un sujet intéresse l’utilisateur.',
 'À comprendre : une déduction reste une hypothèse. Elle peut être incomplète ou fausse. On peut dire « déduction possible », sans prétendre connaître exactement ce que la plateforme sait. L’identité calculée par une plateforme n’est pas la même chose que la réputation d’une personne auprès des autres.',
 'Transition : « Les autres personnes, elles aussi, interprètent ce qu’elles peuvent voir et se forment une impression. »'),
('5. Rayane — l’e-réputation et l’image perçue',
 'L’e-réputation est l’image ou l’opinion qui se construit autour d’une personne à partir de ce qui circule ou est visible en ligne. Cette image peut venir de publications, de commentaires, de photos ou de contenus partagés par d’autres.',
 'À comprendre : l’image que l’on souhaite donner et celle que les autres retiennent peuvent être différentes. Les gens ne voient qu’une partie des informations et peuvent les interpréter sans connaître le contexte. Il n’existe pas de score universel qui mesure la valeur d’une e-réputation.',
 'Transition : « Une publication peut rester accessible ou réapparaître plus tard. Voyons les conséquences possibles et les choix que l’on peut faire. »'),
('6. Badaoui — les conséquences des traces dans le temps',
 'Expliquer de façon générale qu’une ancienne publication, une photo ou un commentaire peut être retrouvé, partagé ou compris différemment plus tard. Cela peut influencer une relation, une occasion d’étude ou de travail, ou simplement l’impression que quelqu’un se fait.',
 'À comprendre : les conséquences dépendent du contenu, de son audience, du contexte et de la manière dont il est partagé. Une personne peut vérifier les réglages, supprimer ou corriger un contenu quand c’est possible, demander de l’aide et éviter de réagir dans la précipitation. Ne pas transformer cette explication en histoire d’un personnage fictif.',
 'Transition : « On peut aussi protéger ses comptes contre les personnes qui cherchent à voler des accès. »'),
('7. Bouazizi — faux messages et double authentification',
 'Lire le passage préparé sur un faux message qui tente de voler un mot de passe ou un code. Un message de ce type peut imiter un service connu et pousser la personne à cliquer sur un lien ou à communiquer ses informations. Lire ensuite le court passage préparé sur la double authentification.',
 'À comprendre : vérifier l’expéditeur et l’adresse du site, ne pas transmettre un code de connexion, et activer un second moyen de vérification quand le service le propose. Les deux textes de Bouazizi sont fournis et lus exactement, sans ajout improvisé.',
 'Transition : « Pour finir, retenons quelques gestes simples à appliquer tous les jours. »'),
('8. Mhaitate — les conseils pratiques',
 'Résumer trois gestes : réfléchir avant de publier ; vérifier qui peut voir ses contenus ; utiliser un mot de passe solide et activer la double authentification si elle est disponible.',
 'À comprendre : ces gestes réduisent certains risques, mais ne permettent pas de contrôler entièrement ce que les autres copient, partagent ou interprètent.',
 'Transition : « Ces conseils nous ramènent à l’idée de départ : notre identité numérique est plus large que ce que nous affichons volontairement. »'),
('9. Présentateur principal — conclure',
 'Revenir à l’iceberg et résumer le chemin : ce que nous déclarons, ce que nous faisons, ce que les plateformes peuvent déduire et l’image que les autres peuvent se former. Conclure en rappelant que réfléchir à ses publications et protéger ses accès aide à mieux gérer son identité numérique.',
 'La conclusion poétique en arabe reste facultative et sera ajoutée seulement si le texte est choisi.',
 'Fin : une phrase courte qui reprend l’idée que notre identité numérique dépasse ce que nous choisissons de montrer.'),
]
for heading, body, learn, handoff in parts:
    doc.add_heading(heading, level=2)
    doc.add_paragraph(body)
    p = doc.add_paragraph()
    p.add_run('À retenir. ').bold = True
    p.add_run(learn.removeprefix('À expliquer : ').removeprefix('À comprendre : '))
    p = doc.add_paragraph()
    p.add_run('Relais. ').bold = True
    p.add_run(handoff.removeprefix('Transition : '))

doc.add_heading('Les trois notions à ne pas confondre', level=1)
table = doc.add_table(rows=1, cols=3)
table.alignment = WD_TABLE_ALIGNMENT.CENTER
table.style = 'Table Grid'
headers = ['Notion', 'Question simple', 'Exemple']
for cell, value in zip(table.rows[0].cells, headers):
    cell.text = value
    cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
    for run in cell.paragraphs[0].runs:
        run.bold = True
        run.font.color.rgb = RGBColor(255,255,255)
    tcPr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement('w:shd'); shd.set(qn('w:fill'), '17324D'); tcPr.append(shd)
rows = [
('Identité déclarative', 'Qu’est-ce que la personne dit ou montre sur elle-même ?', 'Une bio, une photo ou une publication choisie.'),
('Identité agissante', 'Quelles actions fait-elle en ligne ?', 'Commenter, aimer, rechercher ou regarder.'),
('Identité calculée', 'Quelles conclusions un service pourrait-il en tirer ?', 'Une plateforme peut supposer un intérêt à partir de consultations répétées.'),
]
for row in rows:
    cells = table.add_row().cells
    for c, value in zip(cells, row):
        c.text = value
        c.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER

doc.add_heading('Les distinctions essentielles', level=1)
for text in [
    'Une information déclarée n’est pas forcément publique : les paramètres d’audience comptent.',
    'Une action en ligne n’est pas toujours visible par tous : la plateforme peut enregistrer des données que les autres utilisateurs ne voient pas.',
    'Une déduction de plateforme est une hypothèse possible, pas une vérité certaine.',
    'Le profil calculé par une plateforme et l’e-réputation auprès des personnes sont deux choses différentes.',
    'L’iceberg est une métaphore pédagogique, pas une carte exacte de la visibilité des données.',
]:
    doc.add_paragraph(text, style='List Bullet')

doc.add_heading('Résumé à mémoriser', level=1)
doc.add_paragraph(
    'Je choisis certaines informations à déclarer. Mes activités laissent des traces de différentes sortes. Une plateforme peut en tirer des déductions, parfois erronées. Les autres personnes construisent leur propre impression à partir de ce qu’elles voient. Je peux réfléchir avant de publier et protéger mes comptes.'
)

doc.save(OUT)
print(OUT)
