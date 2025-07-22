import {
  logger,
  type Character,
  type IAgentRuntime,
  type Project,
  type ProjectAgent,
} from '@elizaos/core';
import starterPlugin from './plugin.ts';

/**
 * Represents the default character (Eliza) with her specific attributes and behaviors.
 * Eliza responds to a wide range of messages, is helpful and conversational.
 * She interacts with users in a concise, direct, and helpful manner, using humor and empathy effectively.
 * Eliza's responses are geared towards providing assistance on various topics while maintaining a friendly demeanor.
 */
export const character: Character = {
  name: 'Eliza',
  plugins: [
    '@elizaos/plugin-sql',
    ...(process.env.ANTHROPIC_API_KEY ? ['@elizaos/plugin-anthropic'] : []),
    ...(process.env.OPENAI_API_KEY ? ['@elizaos/plugin-openai'] : []),
    ...(!process.env.OPENAI_API_KEY ? ['@elizaos/plugin-local-ai'] : []),
    ...(process.env.DISCORD_API_TOKEN ? ['@elizaos/plugin-discord'] : []),
    ...(process.env.TWITTER_USERNAME ? ['@elizaos/plugin-twitter'] : []),
    ...(process.env.TELEGRAM_BOT_TOKEN ? ['@elizaos/plugin-telegram'] : []),
    ...(!process.env.IGNORE_BOOTSTRAP ? ['@elizaos/plugin-bootstrap'] : []),
  ],
  settings: {
    secrets: {},
  },
  system:
    'Respond to all messages in a helpful, conversational manner. Provide assistance on a wide range of topics, using knowledge when needed. Be concise but thorough, friendly but professional. Use humor when appropriate and be empathetic to user needs. Provide valuable information and insights when questions are asked.',
  bio: [
    'Engages with all types of questions and conversations',
    'Provides helpful, concise responses',
    'Uses knowledge resources effectively when needed',
    'Balances brevity with completeness',
    'Uses humor and empathy appropriately',
    'Adapts tone to match the conversation context',
    'Offers assistance proactively',
    'Communicates clearly and directly',
  ],
  topics: [
    'general knowledge and information',
    'problem solving and troubleshooting',
    'technology and software',
    'community building and management',
    'business and productivity',
    'creativity and innovation',
    'personal development',
    'communication and collaboration',
    'education and learning',
    'entertainment and media',
  ],
  messageExamples: [
    [
      {
        name: '{{name1}}',
        content: {
          text: 'This user keeps derailing technical discussions with personal problems.',
        },
      },
      {
        name: 'Eliza',
        content: {
          text: 'DM them. Sounds like they need to talk about something else.',
        },
      },
      {
        name: '{{name1}}',
        content: {
          text: 'I tried, they just keep bringing drama back to the main channel.',
        },
      },
      {
        name: 'Eliza',
        content: {
          text: "Send them my way. I've got time today.",
        },
      },
    ],
    [
      {
        name: '{{name1}}',
        content: {
          text: "I can't handle being a mod anymore. It's affecting my mental health.",
        },
      },
      {
        name: 'Eliza',
        content: {
          text: 'Drop the channels. You come first.',
        },
      },
      {
        name: '{{name1}}',
        content: {
          text: "But who's going to handle everything?",
        },
      },
      {
        name: 'Eliza',
        content: {
          text: "We will. Take the break. Come back when you're ready.",
        },
      },
    ],
  ],
  style: {
    all: [
      'Keep responses concise but informative',
      'Use clear and direct language',
      'Be engaging and conversational',
      'Use humor when appropriate',
      'Be empathetic and understanding',
      'Provide helpful information',
      'Be encouraging and positive',
      'Adapt tone to the conversation',
      'Use knowledge resources when needed',
      'Respond to all types of questions',
    ],
    chat: [
      'Be conversational and natural',
      'Engage with the topic at hand',
      'Be helpful and informative',
      'Show personality and warmth',
    ],
  },
};

const initCharacter = ({ runtime }: { runtime: IAgentRuntime }) => {
  logger.info('Initializing character');
  logger.info('Name: ', character.name);
};

export const projectAgent: ProjectAgent = {
  character,
  init: async (runtime: IAgentRuntime) => await initCharacter({ runtime }),
  // plugins: [starterPlugin], <-- Import custom plugins here
};
const project: Project = {
  agents: [projectAgent],
};

// Guild data structures
interface Guild {
  id: string;
  name: string;
  description: string;
  category: 'gaming' | 'development' | 'art' | 'research' | 'community';
  memberCount: number;
  requirements: {
    minLevel?: number;
    skills?: string[];
    experience?: number;
  };
  tags: string[];
}

interface UserProfile {
  id: string;
  name: string;
  level: number;
  skills: string[];
  interests: string[];
  experience: number;
  leadership: boolean;
  activityLevel: 'low' | 'medium' | 'high';
}

// Mock guild database
const mockGuilds: Guild[] = [
  {
    id: 'adventurers-guild',
    name: 'Adventurers Guild',
    description: 'For explorers and quest seekers in virtual worlds',
    category: 'gaming',
    memberCount: 150,
    requirements: { minLevel: 10 },
    tags: ['adventure', 'exploration', 'quests', 'RPG'],
  },
  {
    id: 'developers-alliance',
    name: 'Developers Alliance',
    description: 'Collaborative space for game developers and programmers',
    category: 'development',
    memberCount: 89,
    requirements: { skills: ['programming'], experience: 1 },
    tags: ['coding', 'programming', 'collaboration', 'learning'],
  },
  {
    id: 'art-collective',
    name: 'Art Collective',
    description: 'Creative community for digital artists and designers',
    category: 'art',
    memberCount: 67,
    requirements: { skills: ['art', 'design'] },
    tags: ['art', 'design', 'creativity', 'visual'],
  },
  {
    id: 'ai-research-society',
    name: 'AI Research Society',
    description: 'Advanced AI research and experimentation group',
    category: 'research',
    memberCount: 45,
    requirements: { minLevel: 25, skills: ['AI', 'research'], experience: 3 },
    tags: ['AI', 'research', 'innovation', 'technology'],
  },
];

// Guild analysis provider
const guildAnalysisProvider: Provider = {
  get: async (runtime: IAgentRuntime, message: Memory) => {
    const userProfile = extractUserProfile(message);
    const analysis = analyzeGuildSuitability(userProfile);

    return `User Analysis:
- Level: ${userProfile.level}
- Skills: ${userProfile.skills.join(', ')}
- Experience: ${userProfile.experience} years
- Leadership: ${userProfile.leadership ? 'Yes' : 'No'}
- Activity Level: ${userProfile.activityLevel}

${analysis}`;
  },
};

// Extract user profile from message context
function extractUserProfile(message: Memory): UserProfile {
  // In a real implementation, this would fetch from database
  // For now, extract from message or use defaults
  const content = message.content.text.toLowerCase();

  return {
    id: message.userId || 'unknown',
    name: message.userName || 'User',
    level: extractLevel(content),
    skills: extractSkills(content),
    interests: extractInterests(content),
    experience: extractExperience(content),
    leadership: content.includes('lead') || content.includes('manage'),
    activityLevel:
      content.includes('very active')
        ? 'high'
        : content.includes('sometimes')
        ? 'medium'
        : 'low',
  };
}

function extractLevel(content: string): number {
  const levelMatch = content.match(/level\s*(\d+)/i);
  return levelMatch ? parseInt(levelMatch[1]) : Math.floor(Math.random() * 30) + 1;
}

function extractSkills(content: string): string[] {
  const skillKeywords = ['programming', 'coding', 'art', 'design', 'research', 'AI', 'gaming'];
  return skillKeywords.filter((skill) => content.includes(skill.toLowerCase()));
}

function extractInterests(content: string): string[] {
  const interestKeywords = ['games', 'development', 'art', 'AI', 'research', 'community'];
  return interestKeywords.filter((interest) => content.includes(interest.toLowerCase()));
}

function extractExperience(content: string): number {
  const expMatch = content.match(/(\d+)\s*years?\s*(experience|exp)/i);
  return expMatch ? parseInt(expMatch[1]) : Math.floor(Math.random() * 10);
}

// Guild suitability analysis
function analyzeGuildSuitability(userProfile: UserProfile): string {
  const recommendations: string[] = [];

  // Check if user should create their own guild
  if (shouldCreateGuild(userProfile)) {
    recommendations.push("🌟 You're well-suited to create your own guild! Your leadership experience and high activity level make you an ideal guild founder.");
  }

  // Find matching guilds
  const matchingGuilds = findMatchingGuilds(userProfile);

  if (matchingGuilds.length > 0) {
    recommendations.push('\n🏰 Recommended Guilds:');
    matchingGuilds.forEach((guild, index) => {
      const matchScore = calculateMatchScore(userProfile, guild);
      recommendations.push(`\n${index + 1}. **${guild.name}** (${matchScore}% match)`);
      recommendations.push(`   ${guild.description}`);
      recommendations.push(`   Members: ${guild.memberCount} | Category: ${guild.category}`);
    });
  }

  return recommendations.join('\n');
}

function shouldCreateGuild(userProfile: UserProfile): boolean {
  return (
    userProfile.leadership &&
    userProfile.experience >= 3 &&
    userProfile.level >= 20 &&
    userProfile.activityLevel === 'high'
  );
}

function findMatchingGuilds(userProfile: UserProfile): Guild[] {
  return mockGuilds
    .filter((guild) => meetsRequirements(userProfile, guild))
    .sort((a, b) => calculateMatchScore(userProfile, b) - calculateMatchScore(userProfile, a))
    .slice(0, 3);
}

function meetsRequirements(userProfile: UserProfile, guild: Guild): boolean {
  const { requirements } = guild;

  if (requirements.minLevel && userProfile.level < requirements.minLevel) {
    return false;
  }

  if (requirements.experience && userProfile.experience < requirements.experience) {
    return false;
  }

  if (requirements.skills && requirements.skills.length > 0) {
    const hasRequiredSkills = requirements.skills.some((skill) =>
      userProfile.skills.includes(skill)
    );
    if (!hasRequiredSkills) return false;
  }

  return true;
}

function calculateMatchScore(userProfile: UserProfile, guild: Guild): number {
  let score = 0;

  // Skill matching
  const skillMatches = guild.tags.filter((tag) =>
    userProfile.skills.includes(tag) || userProfile.interests.includes(tag)
  ).length;
  score += skillMatches * 20;

  // Level appropriateness
  if (guild.requirements.minLevel) {
    const levelDiff = userProfile.level - guild.requirements.minLevel;
    score += Math.max(0, Math.min(20, levelDiff * 2));
  }

  // Activity level bonus
  if (userProfile.activityLevel === 'high') score += 10;

  return Math.min(100, Math.max(0, score));
}

// Guild recommendation action
const guildRecommendationAction: Action = {
  name: 'GUILD_RECOMMENDATION',
  similes: [
    'RECOMMEND_GUILD',
    'ANALYZE_GUILD_FIT',
    'GUILD_ANALYSIS',
    'FIND_GUILD',
    'GUILD_MATCHING',
  ],
  description: 'Analyze user profile and recommend guilds or suggest creating one',
  validate: async (runtime: IAgentRuntime, message: Memory) => {
    const content = message.content.text.toLowerCase();
    return (
      content.includes('guild') ||
      content.includes('community') ||
      content.includes('join') ||
      content.includes('create')
    );
  },
  handler: async (runtime: IAgentRuntime, message: Memory) => {
    try {
      const context = composeContext({
        state: {
          userProfile: extractUserProfile(message),
          availableGuilds: mockGuilds,
          analysis: await guildAnalysisProvider.get(runtime, message),
        },
        template: `
You are a guild advisor helping users find the right community or decide if they should create their own guild.

Current user context:
{{analysis}}

Based on this information, provide personalized recommendations about:
1. Whether they should create their own guild
2. Which existing guilds would be a good fit
3. Specific reasons for each recommendation

Be encouraging and provide actionable advice.
        `,
      });

      const response = await generateObject({
        runtime,
        context,
        modelClass: ModelClass.SMALL,
        schema: {
          type: 'object',
          properties: {
            recommendation: { type: 'string' },
            shouldCreateGuild: { type: 'boolean' },
            recommendedGuilds: {
              type: 'array',
              items: { type: 'string' },
            },
            reasoning: { type: 'string' },
          },
        },
      });

      return {
        text: response.recommendation,
        metadata: {
          shouldCreateGuild: response.shouldCreateGuild,
          recommendedGuilds: response.recommendedGuilds,
          reasoning: response.reasoning,
        },
      };
    } catch (error) {
      console.error('Guild recommendation error:', error);
      return {
        text: "I'm having trouble analyzing your guild preferences right now. Could you tell me more about your interests and experience level?",
      };
    }
  },
  examples: [
    [
      {
        user: '{{user1}}',
        content: { text: 'I want to find a guild to join. I have 5 years of programming experience and enjoy collaborative projects.' },
      },
      {
        user: 'Eliza',
        content: {
          text: 'Based on your programming experience, I highly recommend the **Developers Alliance**! It\'s perfect for collaborative coding projects. You might also consider creating your own guild given your extensive experience.',
          action: 'GUILD_RECOMMENDATION',
        },
      },
    ],
  ],
};

// Guild plugin export
export const guildPlugin: Plugin = {
  name: 'guild',
  description: 'Guild recommendation and analysis system',
  actions: [guildRecommendationAction],
  providers: [guildAnalysisProvider],
};

export default project;
