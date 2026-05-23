import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useLogStore } from '../store/useLogStore';
import { useDebounce } from '../hooks/useDebounce';

interface FormData {
  searchField: string;
  debounceField: string;
}

interface GithubRepo {
  id: number;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string | null;
}

export function SearchRepo() {
  const [repositories, setRepositories] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorApi, setErrorApi] = useState<string | null>(null);
  const [term, setTerm] = useState('');

  const termDebounced = useDebounce(term, 500);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const addLog = useLogStore((state) => state.addLog);

  const fetchGitHubAPI = async (queryTerm: string, source: 'Manual Button' | 'Debounce Effect') => {
    if (!queryTerm.trim() || queryTerm.length < 2) {
      return;
    }

    setLoading(true);
    setErrorApi(null);
    try {
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=${queryTerm}&sort=stars&order=desc`
      );
      setRepositories(response.data.items || []);
      addLog(`[${source}] Search success with term: "${queryTerm}"`, 'success');
    } catch (error: any) {
      setErrorApi(error.message || 'Error searching for GitHub data.');
      addLog(`[${source}] Search failed with term: "${queryTerm}". Msg: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // manual approach triggered by form submit
  const searchReposManual = (data: FormData) => {
    fetchGitHubAPI(data.searchField, 'Manual Button');
  };

  // reactive approach to monitor the debounced term and trigger search
  useEffect(() => {
    if (termDebounced.trim().length >= 2) {
      fetchGitHubAPI(termDebounced, 'Debounce Effect');
    } else if (termDebounced.trim().length === 0) {
      setRepositories([]);
    }
  }, [termDebounced]);

  return (
    <section className="bg-transparent border border-neutral-700 p-8 rounded-2xl shadow-xl space-y-6">
      <h2 className="text-2xl font-bold text-neutral-100 flex items-center gap-3">
        <span className="bg-sky-950 text-sky-400 size-10 rounded-lg flex items-center justify-center font-black">2.</span>
        Search Submited (GitHub API)
      </h2>

      {/* Formulário de Busca */}
      <form onSubmit={handleSubmit(searchReposManual)} className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl shadow-xl flex gap-3">
        <input
          type="text"
          placeholder="Ex: tailwind, typescript, laravel..."
          className="flex-grow bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2 text-neutral-100 focus:outline-none focus:border-sky-500 transition-colors"
          {...register('searchField', { required: 'Type a term to search' })}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-neutral-700 hover:bg-neutral-600 disabled:bg-neutral-800 text-neutral-100 font-medium px-6 py-2 rounded-lg cursor-pointer transition-colors"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {errors.searchField && <span className="text-red-400 text-xs mt-1 block">{errors.searchField.message}</span>}

      {/* showing field debounced to search on keyboard input */}
      <h2 className="text-2xl font-bold text-neutral-100 flex items-center gap-3">
        <span className="bg-sky-950 text-sky-400 size-10 rounded-lg flex items-center justify-center font-black">3.</span>
        Search debounced (GitHub API)
      </h2>
      <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl shadow-xl gap-3">
        <input
          type="text"
          placeholder="Ex: tailwind, typescript, laravel..."
          className="flex-grow w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2 text-neutral-100 focus:outline-none focus:border-sky-500 transition-colors"
          {...register('debounceField', {
            onChange: (e) => setTerm(() => e.target.value)
          })}
        />
        <div className="px-1 text-[10px] font-mono text-neutral-500">
          <span>Status: {loading && term === termDebounced ? 'Fetching API...' : 'Idle'}</span>
          <span className="ml-2">
            | Stable Value: <span className="text-sky-400">"{termDebounced}"</span>
          </span>
        </div>
      </div>

      {/* listing results */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {errorApi && (
          <div className="bg-red-950/40 border border-red-900 text-red-400 p-4 rounded-xl text-sm col-span-2">
            {errorApi}
          </div>
        )}

        {loading && <div className="text-center py-12 text-neutral-400 animate-pulse col-span-2">Searching for GitHub data...</div>}

        {!loading && repositories.length === 0 && !errorApi && (
          <div className="text-center py-12 text-neutral-500 border border-dashed border-neutral-800 rounded-2xl col-span-2">
            No repositories found. Make a search above.
          </div>
        )}

        {!loading && repositories.map((repo) => (
          <div key={repo.id} className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl flex flex-col justify-between hover:border-neutral-700 transition-all shadow-lg">
            <div>
              <p className="w-full">
                <span className="bg-neutral-800 text-yellow-500 text-xs font-bold px-3 py-1 rounded-full shrink-0">
                  ★ {repo.stargazers_count.toLocaleString()}
                </span>
              </p>
              <div className="flex justify-between items-start gap-2">
                <h3 className="text-sky-400 hover:underline font-semibold break-all text-lg">
                  <a href={repo.html_url} target="_blank" rel="noreferrer">{repo.full_name}</a>
                </h3>
              </div>
              <p className="text-neutral-400 text-sm mt-3 line-clamp-3">
                {repo.description || 'No description available.'}
              </p>
            </div>

            <div className="mt-2 pt-4 border-t border-neutral-800 text-xs text-neutral-400">
              {repo.language && (
                <span className="bg-neutral-800 px-3 py-1 rounded-md font-medium text-sky-200">
                  {repo.language}
                </span>
              )}
              <a href={repo.html_url} target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors font-medium ml-2">
                <span className="bg-neutral-800 px-3 py-1 rounded-md font-medium text-sky-200">
                  View on GitHub →
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}