import type { Particle, SectionContent } from '../../types';

// Section 9.6 · Molecular Shapes (VSEPR) (Tro 11.1–11.4). PATTERN SECTION: shapes, flat pictures plus the 3D viewer.
// Running example: water, H2O: four electron groups on O, two of them lone pairs, so it is bent (104.5°).
// Chapter 9 rule: say "electron groups" and "lone pairs", never orbits or shells (docs/chapter-map.md).
// The viewer shows only molecules BYE Chem Engine names (CH4, NH3, H2O, CO2, BF3, CH2O, C2H4, SO2);
// SF6 and PCl5 stay out until the engine's angle-mark fix is approved.
const CO2: Particle = { formula: 'CO2' };
const CH4: Particle = { formula: 'CH4' };
const NH3: Particle = { formula: 'NH3' };
const H2O: Particle = { formula: 'H2O' };
const faded = (p: Particle): Particle => ({ ...p, faded: true });

export const s9_6: SectionContent = {
  id: '9.6',
  intro: 'A Lewis structure shows which atoms are bonded, but it is flat. This section shows how to predict a molecule’s real 3D shape, from one idea: the <b>electron groups</b> around a central atom push each other as far apart as they can.',
  reads: [
    {
      id: 'groups-push-apart',
      title: 'Electron groups push apart',
      gist: 'The one idea behind every molecular shape.',
      minutes: 2,
      blocks: [
        { p: 'Why is a water molecule bent, while carbon dioxide is a straight line? Both have a central atom with two atoms bonded to it. The difference is in the electrons around the central atom.' },
        { p: 'Around a central atom, electrons sit in <b>electron groups</b>. A group is either a bond to another atom or a <b>lone pair</b>: two electrons that belong to the central atom alone. All groups are negative, so they push each other away and spread out as far as they can. This idea is called <b>VSEPR</b>, short for valence-shell electron-pair repulsion.' },
        {
          particles: { describe: 'A carbon dioxide molecule in a straight line: oxygen, carbon, oxygen.', groups: [{ items: [CO2], label: 'CO<sub>2</sub>: two groups, as far apart as they can get' }] },
          level: 'particles',
        },
        { key: 'Electron groups around a central atom spread as far apart as they can. That spread sets the shape.' },
        { p: 'Think of balloons tied together at their necks: two point opposite ways, three make a flat triangle, and four point to the corners of a tetrahedron, a pyramid with a triangle for a base. Electron groups do the same. Through this section we follow water, H<sub>2</sub>O, to see why it is bent.' },
      ],
    },
    {
      id: 'counting-groups',
      title: 'Counting electron groups',
      gist: 'Read the groups off the Lewis structure: bonded atoms plus lone pairs.',
      minutes: 3,
      blocks: [
        { p: 'Start from the Lewis structure (Section 9.2). Look only at the central atom, and count two things: how many atoms are bonded to it, and how many lone pairs it has. Their sum is the number of electron groups.' },
        { key: 'A single, double or triple bond counts as <b>one</b> group: all of its electrons point the same way, toward one atom.' },
        {
          table: {
            head: ['Molecule', 'Bonded atoms', 'Lone pairs', 'Groups'],
            rows: [
              ['CO<sub>2</sub>', '2', '0', '2'],
              ['CH<sub>4</sub>', '4', '0', '4'],
              ['NH<sub>3</sub>', '3', '1', '4'],
              ['H<sub>2</sub>O', '2', '2', '4'],
            ],
          },
        },
        {
          particles: { describe: 'A water molecule, ringed: its oxygen has two bonded hydrogens and two lone pairs, four groups.', groups: [{ items: [{ ...H2O, ring: true }], label: 'O: 2 bonded atoms + 2 lone pairs' }] },
          level: 'particles',
        },
        { work: [['groups = 2 + 2 = 4', 'water’s oxygen']] },
        { p: 'So the oxygen in water has four electron groups, the same number as the carbon in methane, CH<sub>4</sub>. The carbon in carbon dioxide has only two, because each double bond counts as one group.' },
      ],
    },
    {
      id: 'basic-shapes',
      title: 'Two, three or four groups',
      gist: 'Each number of groups has one best arrangement, with its own angle.',
      minutes: 3,
      blocks: [
        { p: 'For each number of groups there is one arrangement that puts them furthest apart. This is the <b>electron arrangement</b>, and it comes with an angle between the groups.' },
        {
          table: {
            head: ['Groups', 'Arrangement', 'Angle', 'Example'],
            rows: [
              ['2', 'linear', '180°', 'CO<sub>2</sub>'],
              ['3', 'trigonal planar', '120°', 'BF<sub>3</sub>'],
              ['4', 'tetrahedral', '109.5°', 'CH<sub>4</sub>'],
            ],
          },
        },
        { p: 'Four groups are the surprise. On paper you would draw them in a flat cross, 90° apart, but in three dimensions they can get further apart: to the corners of a <b>tetrahedron</b>, 109.5° from each other. Drag the model to turn it.' },
        { molecule: { formula: 'CH4', describe: 'A 3D model of methane: a carbon atom with four hydrogen atoms at the corners of a tetrahedron, 109.5 degrees apart. Drag to turn it.' } },
        { key: '2 groups: linear, 180°. 3 groups: trigonal planar, 120°. 4 groups: tetrahedral, 109.5°.' },
        { p: 'In Chem 1A and AP you will also meet atoms with five or six groups, which break the octet rule (Section 9.5). Five groups make a trigonal bipyramid and six make an octahedron.' },
      ],
    },
    {
      id: 'lone-pairs',
      title: 'Lone pairs and the shape’s name',
      gist: 'Lone pairs take up room, but the shape is named from the atoms only.',
      minutes: 3,
      blocks: [
        { p: 'Water’s oxygen has four groups, so they take the tetrahedral arrangement, just like methane’s. But two of the four are lone pairs. A molecule’s <b>shape</b> is named from where its <b>atoms</b> are, and with only two hydrogens on the tetrahedron, water is <b>bent</b>.' },
        {
          frames: [
            {
              caption: 'Methane: four bonded atoms, no lone pairs. Tetrahedral, 109.5°.',
              particles: { describe: 'A methane molecule, labelled 109.5 degrees.', groups: [{ items: [CH4], label: 'CH<sub>4</sub>: 109.5°' }] },
            },
            {
              caption: 'Ammonia: one group is a lone pair. The three hydrogens make a low pyramid: trigonal pyramidal, about 107°.',
              particles: { describe: 'Methane, faded, then an ammonia molecule labelled 107 degrees.', groups: [{ items: [faded(CH4)], label: '109.5°' }, { items: [NH3], label: 'NH<sub>3</sub>: 107°' }], ops: [''] },
            },
            {
              caption: 'Water: two groups are lone pairs. Only two atoms are left on the tetrahedron: bent, 104.5°.',
              particles: { describe: 'Methane and ammonia, faded, then a water molecule labelled 104.5 degrees.', groups: [{ items: [faded(CH4)], label: '109.5°' }, { items: [faded(NH3)], label: '107°' }, { items: [H2O], label: 'H<sub>2</sub>O: 104.5°' }], ops: ['', ''] },
            },
          ],
          label: 'Picture it',
        },
        { p: 'The angles shrink, too. A lone pair is held by only one atom, so it spreads out wider than a bond and squeezes the bonds closer together: 109.5° in CH<sub>4</sub>, about 107° in NH<sub>3</sub>, 104.5° in H<sub>2</sub>O.' },
        { molecule: { formula: 'H2O', describe: 'A 3D model of water: an oxygen atom with two hydrogen atoms at 104.5 degrees, a bent molecule. Drag to turn it.' } },
        { key: 'Name the shape from the atoms only. Four groups with one lone pair: trigonal pyramidal. With two: bent.' },
        { p: 'That answers the opening question. Water is bent because two of its oxygen’s four groups are lone pairs. Carbon dioxide is straight because its carbon has just two groups and no lone pairs.' },
      ],
    },
    {
      id: 'using-it-well',
      title: 'Using it well',
      gist: 'Four moves from formula to shape, and the moves in Example 1.',
      minutes: 2,
      blocks: [
        { p: 'Use these four moves for any molecule with one central atom. For a bigger molecule, do them once for each central atom.' },
        {
          work: [
            ['Draw the Lewis structure', '1 · Section 9.2'],
            ['Count groups on the central atom', '2 · bonds + lone pairs'],
            ['Pick the arrangement', '3 · 2, 3 or 4 groups'],
            ['Name the shape from the atoms', '4 · lone pairs unnamed'],
          ],
        },
        {
          table: {
            head: ['Groups', 'Lone pairs', 'Shape', 'Angle'],
            rows: [
              ['2', '0', 'linear', '180°'],
              ['3', '0', 'trigonal planar', '120°'],
              ['3', '1', 'bent', 'a little under 120°'],
              ['4', '0', 'tetrahedral', '109.5°'],
              ['4', '1', 'trigonal pyramidal', 'about 107°'],
              ['4', '2', 'bent', 'about 104.5°'],
            ],
          },
        },
        {
          particles: {
            describe: 'Carbon dioxide, straight, beside water, bent.',
            groups: [{ items: [CO2], label: '2 groups: straight' }, { items: [H2O], label: '4 groups, 2 lone pairs: bent' }],
            ops: [''],
          },
          level: 'particles',
        },
        { p: 'Angles like 107° and 104.5° are measured. From VSEPR alone you can say “a little less than 109.5°”, and that is enough to predict the shape.' },
      ],
    },
  ],
  tool: 'electron groups → arrangement → shape',
  toolNote: 'Groups are bonded atoms plus lone pairs on the central atom; a double or triple bond is one group. The shape is named from the atoms only.',
  ideas: [
    { title: 'Groups push apart', body: 'Bonds and lone pairs around a central atom spread as far apart as they can.' },
    { title: 'Count groups, not bonds', body: 'Bonded atoms plus lone pairs. A double or triple bond counts once.' },
    { title: 'Three arrangements', body: '2 groups: linear, 180°. 3: trigonal planar, 120°. 4: tetrahedral, 109.5°.' },
    { title: 'Lone pairs hide in the name', body: 'The shape is named from the atoms: four groups with two lone pairs is bent, like H<sub>2</sub>O.' },
  ],
  why: [
    {
      caption: 'Two groups get furthest apart in a straight line: CO<sub>2</sub> is linear.',
      particles: { describe: 'A straight carbon dioxide molecule.', groups: [{ items: [CO2], label: '180°' }] },
    },
    {
      caption: 'Four groups point to the corners of a tetrahedron, 109.5° apart.',
      particles: { describe: 'Carbon dioxide, faded, then methane.', groups: [{ items: [faded(CO2)], label: '180°' }, { items: [CH4], label: '109.5°' }], ops: [''] },
    },
    {
      caption: 'Make two of the four groups lone pairs, and the atoms left are bent. That is why water is bent and CO<sub>2</sub> is straight.',
      particles: { describe: 'Carbon dioxide and methane, faded, then a bent water molecule.', groups: [{ items: [faded(CO2)], label: '180°' }, { items: [faded(CH4)], label: '109.5°' }, { items: [H2O], label: '104.5°' }], ops: ['', ''] },
    },
  ],
  spot: {
    clues: [
      { text: 'The shape or geometry of a molecule is asked for', example: 'What is the shape of NH<sub>3</sub>?', note: 'Lewis structure first, then count groups' },
      { text: 'A bond angle is asked for', example: 'the H–O–H angle in water', note: 'groups set it: 180°, 120°, 109.5°, a little less with lone pairs' },
      { text: 'Lone pairs on the central atom', example: 'N in NH<sub>3</sub> has one lone pair', note: 'the shape’s name changes' },
      { text: 'Double or triple bonds to the central atom', example: 'O=C=O', note: 'each counts as one group' },
    ],
    lookAlikes: [
      { looks: 'Is the molecule polar?', use: 'Shape and polarity', why: 'shape comes first; then check whether the bonds’ pulls cancel.', link: '9.7' },
      { looks: 'Why does methane have four equal bonds?', use: 'Hybridization', why: 'that explains the bonds with orbitals; VSEPR only predicts the shape.', link: '12.5' },
    ],
  },
  mistakes: [
    { wrong: 'H<sub>2</sub>O is linear: H–O–H', right: 'H<sub>2</sub>O is bent, 104.5°', why: 'The Lewis drawing is flat on paper. Oxygen’s two lone pairs push the hydrogens down.' },
    { wrong: 'CO<sub>2</sub>: 4 electron groups', right: 'CO<sub>2</sub>: 2 electron groups', why: 'Each double bond is one group: it points one way, toward one oxygen.' },
    { wrong: 'NH<sub>3</sub> is tetrahedral', right: 'NH<sub>3</sub> is trigonal pyramidal', why: 'Its four groups are arranged tetrahedrally, but the shape is named from its three H atoms only.' },
    { wrong: 'CH<sub>4</sub>: 90° apart, a flat cross', right: 'CH<sub>4</sub>: 109.5° apart, a tetrahedron', why: 'In three dimensions the four groups can spread further apart than 90°.' },
  ],
  examples: [
    {
      id: '9.6-1',
      question: 'What is the shape of carbon dioxide, CO<sub>2</sub> (O=C=O)?',
      level: 'easy',
      steps: [
        {
          move: 'Count groups',
          say: 'Carbon has two double bonds and no lone pairs. Each double bond counts as one group.',
          lines: [{ left: 'groups', right: '2 + 0', op: 'bonds + lone' }, { right: '2' }],
        },
        {
          move: 'Arrange',
          say: 'Two groups get furthest apart on opposite sides of the carbon.',
          lines: [{ left: 'arranged', right: 'linear' }],
        },
        {
          move: 'Name it',
          say: 'There are no lone pairs, so the shape is the same as the arrangement.',
          lines: [{ left: 'shape', right: 'linear' }, { left: 'angle', right: '180°' }],
        },
      ],
      answer: 'Carbon dioxide is linear: O=C=O in a straight line, 180°.',
    },
    {
      id: '9.6-2',
      question: 'What is the shape of ammonia, NH<sub>3</sub>?',
      level: 'typical',
      steps: [
        {
          move: 'Count groups',
          say: 'Nitrogen has three bonds to hydrogen and one lone pair.',
          lines: [{ left: 'groups', right: '3 + 1', op: 'bonds + lone' }, { right: '4' }],
          qs: [['Where does the lone pair come from?', 'Nitrogen brings 5 valence electrons. Three go into the bonds; the other two stay on nitrogen as a lone pair.']],
        },
        {
          move: 'Arrange',
          say: 'Four groups take the tetrahedral arrangement.',
          lines: [{ left: 'arranged', right: 'tetrahedral' }],
        },
        {
          move: 'Name it',
          say: 'Only three corners hold atoms. Three hydrogens below a nitrogen with a lone pair on top make a low pyramid.',
          lines: [{ left: 'shape', right: 'trigonal pyramidal' }, { left: 'angle', right: 'about 107°' }],
          qs: [['Why less than 109.5°?', 'The lone pair spreads wider than a bond and squeezes the three N–H bonds closer together.']],
        },
      ],
      answer: 'Ammonia is trigonal pyramidal, with H–N–H angles of about 107°.',
    },
    {
      id: '9.6-3',
      question: 'What is the shape of formaldehyde, CH<sub>2</sub>O (H<sub>2</sub>C=O)?',
      level: 'harder',
      steps: [
        {
          move: 'Lewis first',
          say: 'Carbon is in the middle, bonded to two hydrogens and, by a double bond, to oxygen. It has no lone pairs.',
          lines: [{ left: 'C', right: '2 single bonds, 1 double bond' }],
        },
        {
          move: 'Count groups',
          say: 'The double bond to oxygen counts as just one group.',
          lines: [{ left: 'groups', right: '3 + 0', op: 'bonds + lone' }, { right: '3' }],
          qs: [['Why isn’t the double bond two groups?', 'Both of its electron pairs lie between the same two atoms, so they point the same way.']],
        },
        {
          move: 'Arrange',
          say: 'Three groups spread out flat, 120° apart.',
          lines: [{ left: 'arranged', right: 'trigonal planar' }],
        },
        {
          move: 'Name it',
          say: 'All three corners hold atoms, so the shape is the same as the arrangement.',
          lines: [{ left: 'shape', right: 'trigonal planar' }, { left: 'angle', right: 'about 120°' }],
        },
      ],
      answer: 'Formaldehyde is trigonal planar: flat, with angles of about 120°.',
    },
  ],
  realUses: [
    { where: 'Why ice floats', what: 'Bent water molecules line up in ice with open spaces between them, so ice is less dense than liquid water (Section 13.7).', eq: 'O: 2 bonds + 2 lone pairs → bent, 104.5°' },
    { where: 'Natural gas', what: 'Methane’s tetrahedron is the same on every side, one reason it barely mixes with water.', eq: 'C: 4 bonds → tetrahedral, 109.5°' },
    { where: 'Fizzy drinks', what: 'Straight CO<sub>2</sub> is the same at both ends, so water holds it only loosely: open the can and it escapes as bubbles.', eq: 'C: 2 double bonds → linear, 180°' },
    { where: 'Household ammonia', what: 'Ammonia’s lone pair sits on top of its pyramid, free to grab a hydrogen ion. That is what makes it a base.', eq: 'N: 3 bonds + 1 lone pair → trigonal pyramidal, 107°' },
  ],
  next: [
    { id: '9.7', note: 'Shape decides whether a molecule is polar.' },
    { id: '12.5', note: 'The orbitals behind these shapes.' },
    { id: '13.2', note: 'Shape and polarity set the pull between molecules.' },
  ],
};
