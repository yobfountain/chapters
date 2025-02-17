class Outline
  def self.data
    {
      acts: [
        {
          title: "Act 1",
          category: "setup",
          description: "This act introduces the main character in their ordinary world, disrupts it, and then shows how their life will never be the same.",
          blocks: [
            {
              title: "Block 1",
              id: "block_01",
              category: "setup",
              description: "The scenes in this block show a snapshot of the protagonist before their life changes.",
              chapters: [
                { title: "Introduction", id: "chapter_01", category: "setup", description: "The reader meets the main character and sees them in their normal life." },
                { title: "Inciting incident", id: "chapter_02", category: "conflict", description: "Something happens to disrupt the main character\'s ordinary life." },
                { title: "Fallout", id: "chapter_03", category: "resolution", description: "The main character immediately reacts to the inciting incident." },
              ]
            },
            {
              title: "Block 2",
              id: "block_02",
              category: "conflict",
              description: "The scenes in this block show a snapshot of the protagonist before their life changes.",
              chapters: [
                { title: "Choice", id: "chapter_04", category: "setup", description: "The main character pushes back against what happened or was revealed in the inciting incident." },
                { title: "Action", id: "chapter_05", category: "conflict", description: "The hero takes action to fix what happened in the inciting incident." },
                { title: "Consequence", id: "chapter_06", category: "resolution", description: "The main character must face the consequences of the action they took(or tried to take)." },
              ]
            },
            {
              title: "Block 3",
              id: "block_03",
              category: "resolution",
              description: "The scenes in this block show a snapshot of the protagonist before their life changes.",
              chapters: [
                { title: "Pressure", id: "chapter_07", category: "setup", description: "The main character starts to feel the weight of what's happening to them." },
                { title: "Plot twist", id: "chapter_08", category: "conflict", description: "A plot twist happens, making the main character wonder if they made the right decision when they decided to take action." },
                { title: "Push", id: "chapter_09", category: "resolution", description: "The main character is forced once and for all out of their ordinary world." },
              ]
            },
          ]
        },
        {
          title: "Act 2",
          category: "conflict",
          description: "In this act, we see the main character interact with their new world and take on a number of new challenges.",
          blocks: [
            {
              title: "Block 4",
              id: "block_04",
              category: "setup",
              description: "Block I of Act II sees the protagonist enter their new world and start to explore it.",
              chapters: [
                { title: "New world", id: "chapter_10", category: "setup", description: "The main character explores the shiny new world (or state of mind) they're now living in." },
                { title: "Fun and games", id: "chapter_11", category: "conflict", description: "The protagonist plays around in the new world, potentially meeting new characters." },
                { title: "Old world", id: "chapter_12", category: "resolution", description: "We see a contrast between the main character's new world to the ordinary world they left behind." }
              ]
            },
            {
              title: "Block 5",
              id: "block_05",
              category: "conflict",
              description: "In the second block of Act II, the main character experiences some struggles as they encounter challenges in their new surroundings.",
              chapters: [
                { title: "Build-up", id: "chapter_13", category: "setup", description: "Complications occur: the main character faces some serious struggles, internal or external." },
                { title: "Midpoint", id: "chapter_14", category: "conflict", description: "Something big happens that changes everything for your main character." },
                { title: "Reversal", id: "chapter_15", category: "resolution", description: "The main character decides on a new course of action based on what's been revealed at the midpoint." }
              ]
            },
            {
              title: "Block 6",
              id: "block_06",
              category: "resolution",
              description: "The final block of Act II sees the protagonist dedicated to finding a solution to the challenges they're dealing with. ",
              chapters: [
                { title: "Action", id: "chapter_16", category: "setup", description: "The hero reflects on all that's happened to them on their journey so far." },
                { title: "Trials", id: "chapter_17", category: "conflict", description: "The protagonist takes action to solve their problems and makes progress based on the lessons they’ve learned in previous conflicts." },
                { title: "Dedication", id: "chapter_18", category: "resolution", description: "Despite the challenges they're facing, the main character resolves to solve their issues." }
              ]
            }
          ]
        },
        {
          title: "Act 3",
          category: "resolution",
          description: "The protagonist experiences their greatest challenge yet. Everything they've learned has led up to this moment.",
          blocks: [
            {
              title: "Block 7",
              id: "block_07",
              category: "setup",
              description: "The hero experiences a huge setback, the biggest of the story so far.",
              chapters: [
                { title: "Calm before the storm", id: "chapter_19", category: "setup", description: "The hero feels the pressure as they decide to put their plan into action." },
                { title: "Plot twist ", id: "chapter_20", category: "conflict", description: "Something terrible occurs, the worst complication in the story to this point." },
                { title: "Darkest moment", id: "chapter_21", category: "resolution", description: "The main character is at their lowest. Is all lost?" }
              ]
            },
            {
              title: "Block 8",
              id: "block_08",
              category: "conflict",
              description: "In this block, the protagonist must find the resolve within themselves to overcome their challenges. ",
              chapters: [
                { title: "Power within", id: "chapter_22", category: "setup", description: "The hero reaches deep inside to bring themselves back from the brink of destruction." },
                { title: "Action", id: "chapter_23", category: "conflict", description: "With renewed resolve, the protagonist formulates a plan to take action." },
                { title: "Converge", id: "chapter_24", category: "resolution", description: "All of the characters and main plot points gather for the big finale." }
              ]
            },
            {
              title: "Block 9",
              id: "block_09",
              category: "resolution",
              description: "We've reached the end of the story. In the final block, the hero must face their trials and emerge victorious.",
              chapters: [
                { title: "Battle ", id: "chapter_25", category: "setup", description: "The hero faces down their nemesis. This scene is not always a literal battle: sometimes, the hero is tackling an internal demon in a high-pressure situation (like declaring their eternal love before a big group of people)." },
                { title: "Climax", id: "chapter_26", category: "conflict", description: "Everything has led to this moment. The hero succeeds or fails, depending on your story." },
                { title: "Resolution", id: "chapter_27", category: "resolution", description: "We see the hero in the aftermath of the climax. Are they celebrating their victory or licking their wounds?" }
              ]
            }
          ]
        }
      ]
    }
  end

  def self.placeholders
    placeholders = {}
    self.data[:acts].each do |act|
      act[:blocks].each do |block|
        block[:chapters].each do |chapter|
          placeholders[chapter[:id]] = chapter[:description]
        end
      end
    end
    placeholders
  end
end