import { useState } from 'react';
import { Sidebar, type AppState } from '@/components/Sidebar';
import { Overview } from '@/components/Overview';
import { ProposedChange } from '@/components/ProposedChange';
import { ChangeImpactResults } from '@/components/ChangeImpactResults';
import { ImpactAnalysis } from '@/components/ImpactAnalysis';
import { ExplainImpact } from '@/components/ExplainImpact';
import { Recommendations } from '@/components/Recommendations';
import type { AnalysisResult } from '@/data/changeAnalysis';

function App() {
  const [state, setState] = useState<AppState>('overview');
  const [completed, setCompleted] = useState<Set<AppState>>(new Set());
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [changeInput, setChangeInput] = useState('');

  const navigate = (next: AppState) => {
    setCompleted((prev) => {
      const updated = new Set(prev);
      updated.add(state);
      return updated;
    });
    setState(next);
  };

  const handleAnalyzed = (input: string, result: AnalysisResult) => {
    setChangeInput(input);
    setAnalysisResult(result);
    setCompleted((prev) => {
      const updated = new Set(prev);
      updated.add('proposed');
      return updated;
    });
    setState('impact');
  };

  return (
    <div className="flex min-h-screen bg-ink-50">
      <Sidebar activeState={state} onNavigate={navigate} completedStates={completed} />
      <main className="flex-1 min-w-0 overflow-y-auto h-screen">
        {state === 'overview' && <Overview onAnalyze={() => navigate('proposed')} />}
        {state === 'proposed' && <ProposedChange onAnalyzed={handleAnalyzed} />}
        {state === 'impact' &&
          (analysisResult ? (
            <ChangeImpactResults
              result={analysisResult}
              changeInput={changeInput}
              onContinue={() => navigate('explain')}
            />
          ) : (
            <ImpactAnalysis onExplain={() => navigate('explain')} />
          ))}
        {state === 'explain' && (
          <ExplainImpact onRecommendations={() => navigate('recommendations')} />
        )}
        {state === 'recommendations' && (
          <Recommendations
            dynamicActions={analysisResult?.recommendedActions}
            dynamicNextStep={analysisResult?.recommendedNextStep}
            dynamicWhyThisMatters={analysisResult?.whyThisMatters}
          />
        )}
      </main>
    </div>
  );
}

export default App;
