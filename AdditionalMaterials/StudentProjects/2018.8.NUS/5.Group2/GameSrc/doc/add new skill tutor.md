# add new skill tutor

This file will teach you to add new skill for a character.

## Implement the skill class

Implement a new class represent the skill. The class should extends class Skill and implement all methods. 
IfYou can skip this step if you want to use a existing skill.

## add existing skill to a character

1. Go to file [skill.js](src/MyGame/Characters/skill.js) and look at window.allSkills. Find a skill
you want to add and remember the skill name (key of the dict) and the class (value of the dict).
2. Go to the class and see what parameter you should pass into the constructor.
3. Go to file [character_json.json](assets/hero/character_info.json) and add a dict to the skills of 
the character you want to add the skill to. The dict should contain all parameters in the constructor
of the class, with one more parameter -- name, which is the name of the skill.
4. If everything work smoothly, the parser will parse the new skill to the character. 
