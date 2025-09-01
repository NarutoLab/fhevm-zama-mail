import { useState, useRef, useEffect } from "react";
import { useFHEZmail } from "@/hooks/useFHEZmail";
import { useInMemoryStorage } from "@/hooks/useInMemoryStorage";
import { Mail, Box, LoadingBarRef } from "@/types";
import { TAB_INDEXES, TabIndex } from "@/constants/index";

import isEqual from "lodash/isEqual";

export const useZmailManager = () => {
  const { storage: fhevmDecryptionSignatureStorage } = useInMemoryStorage();
  const {
    isInitialized,
    acount,
    getInbox,
    getTrash,
    getSent,
    getRead,
    getSpam,
    getArchive,
    getStarred,
    getThread,
    sendMail,
    reply,
    forward,
    moveMails,
  } = useFHEZmail({
    fhevmDecryptionSignatureStorage,
  });

  // ===== STATE =====
  const [loading, setLoading] = useState(true);
  const [isOpenEditor, setIsOpenEditor] = useState(false);
  const [activeTab, setActiveTab] = useState<TabIndex>(TAB_INDEXES.INBOX);
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filteredMails, setFilteredMails] = useState<Mail[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [activeMail, setActiveMail] = useState<Mail | null>(null);
  const [selectedMailIds, setSelectedMailIds] = useState<number[]>([]);
  const [isReplying, setIsReplying] = useState(false);
  const [isForwarding, setIsForwarding] = useState(false);
  const [bulkActionType, setBulkActionType] = useState<Box | null>(null);
  const [threadMails, setThreadMails] = useState<Mail[]>([]);
  const [mails, setMails] = useState<Mail[]>([]);

  // ===== REF =====
  const loadingBarRef = useRef<LoadingBarRef["current"]>(null);
  const threadMailsRef = useRef(threadMails);

  const refreshMap: Record<number, () => Promise<Mail[]>> = {
    [TAB_INDEXES.SENT]: () => getSent(),
    [TAB_INDEXES.SPAM]: () => getSpam(),
    [TAB_INDEXES.READ]: () => getRead(),
    [TAB_INDEXES.INBOX]: () => getInbox(),
    [TAB_INDEXES.TRASH]: () => getTrash(),
    [TAB_INDEXES.STARRED]: () => getStarred(),
    [TAB_INDEXES.ARCHIVE]: () => getArchive(),
  };

  const refreshByTab = async (tabIndex: number): Promise<Mail[]> => {
    const fn = refreshMap[tabIndex];
    return fn ? await fn() : [];
  };

  const getMailIds = () => mails.map((mail) => mail.id);

  function isMe(owner: string, acount: string): boolean {
    return owner.toLowerCase() === acount.toLowerCase();
  }

  useEffect(() => {
    const run = async (): Promise<void> => {
      if (isInitialized) {
        const mails = await refreshByTab(activeTab);
        setMails(mails);
      }
    };

    run();
  }, [isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      let intervalId: NodeJS.Timeout;

      const fetchData = async () => {
        const newMails = await refreshByTab(activeTab);
        setMails((prev) => (isEqual(newMails, prev) ? prev : newMails));
      };

      const run = async () => {
        setLoading(true);
        await fetchData();
        setLoading(false);
        intervalId = setInterval(fetchData, 5000);
      };

      run();

      return () => {
        if (intervalId) clearInterval(intervalId);
      };
    }
  }, [activeTab, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      setLoading(true);
      setIsSearching(true)
      const handler = setTimeout(async () => {
        const mails = await refreshByTab(activeTab);
        const filterMails = mails.filter((mail: Mail) => {
          const searchTarget = isMe(mail.from, acount ?? "") ? mail.to: mail.from;

          return searchTarget ?.toLowerCase().includes(searchValue.toLowerCase());
        });
        setFilteredMails(searchValue ? filterMails : []);
        setIsSearching(Boolean(searchValue))
        setLoading(false);
      }, 300);

      return () => clearTimeout(handler);
    }
  }, [searchValue]);

  useEffect(() => {
    threadMailsRef.current = threadMails;
  }, [threadMails]);

  useEffect(() => {
    let running = true;

    const runLoop = async () => {
      let firstRun = true;

      while (activeMail?.threadId && running) {
        const mails = await getThread(activeMail.threadId, threadMailsRef.current, firstRun);
        if (mails.length === 0) break;

        !isEqual(mails, threadMailsRef.current) && setThreadMails(mails);

        firstRun = false;
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    };

    if (activeMail?.threadId) runLoop();

    return () => {
      running = false;
    };
  }, [activeMail]);

  useEffect(() => {
    setIsSelecting(false);
    setActiveMail(null);
    setIsReplying(false);
    setIsForwarding(false);
    setSelectedMailIds([]);
    setThreadMails([]);
  }, [activeTab]);

  return {
    state: {
      loading,
      isOpenEditor,
      activeTab,
      searchValue,
      isSearching,
      filteredMails,
      isSelecting,
      activeMail,
      selectedMailIds,
      isReplying,
      isForwarding,
      bulkActionType,
      threadMails,
      mails,
    },
    setters: {
      setLoading,
      setIsOpenEditor,
      setActiveTab,
      setSearchValue,
      setIsSearching,
      setFilteredMails,
      setIsSelecting,
      setActiveMail,
      setSelectedMailIds,
      setIsReplying,
      setIsForwarding,
      setBulkActionType,
      setThreadMails,
      setMails,
    },
    refs: {
      loadingBarRef,
    },
    methods: {
      sendMail,
      reply,
      forward,
      getMailIds,
      refreshByTab,
      moveMails,
    },
  };
};
